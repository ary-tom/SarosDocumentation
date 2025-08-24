"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, FileText, Code, Book, Terminal, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchResult {
  path: string
  title: string
  content: string
  line?: number
}

interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          e.preventDefault()
          onClose()
          break
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (searchResults[selectedIndex]) {
            handleResultSelect(searchResults[selectedIndex])
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, searchResults, selectedIndex, onClose])

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchResults])

  // Search functionality
  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length > 2) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          const data = await response.json()
          setSearchResults(data.results || [])
        } catch (error) {
          console.error("Search error:", error)
          setSearchResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleResultSelect = (result: SearchResult) => {
    router.push(result.path)
    onClose()
    setSearchQuery("")
  }

  const getResultIcon = (path: string) => {
    if (path.includes("/api/")) return <Code className="h-4 w-4" />
    if (path.includes("/examples/")) return <Terminal className="h-4 w-4" />
    if (path.includes("/tutorials/")) return <Book className="h-4 w-4" />
    if (path.includes("/playground/")) return <Zap className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl mx-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full h-14 pl-12 pr-4 text-lg bg-background/95 backdrop-blur border-2 border-border/50 rounded-xl shadow-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Results */}
        {searchQuery.length > 0 && (
          <div className="mt-4 bg-background/95 backdrop-blur border border-border/50 rounded-xl shadow-2xl overflow-hidden">
            {isLoading ? (
              <div className="p-4 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Searching...</span>
                </div>
              </div>
            ) : searchResults.length === 0 && searchQuery.length > 2 ? (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultSelect(result)}
                    className={`w-full p-4 text-left hover:bg-accent/50 transition-colors border-b border-border/30 last:border-b-0 ${
                      index === selectedIndex ? "bg-accent/50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-muted-foreground">{getResultIcon(result.path)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">
                            {result.title || result.path.split("/").pop()}
                          </h3>
                          <ArrowRight className="h-3 w-3 text-muted-foreground ml-2 flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.content}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{result.path}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        )}

        {/* Quick Actions */}
        {searchQuery.length === 0 && (
          <div className="mt-4 bg-background/95 backdrop-blur border border-border/50 rounded-xl shadow-2xl p-4">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  router.push("/quickstart")
                  onClose()
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/50 transition-colors text-left"
              >
                <Book className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Quick Start</span>
              </button>
              <button
                onClick={() => {
                  router.push("/playground")
                  onClose()
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/50 transition-colors text-left"
              >
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Playground</span>
              </button>
              <button
                onClick={() => {
                  router.push("/api")
                  onClose()
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/50 transition-colors text-left"
              >
                <Code className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">API Reference</span>
              </button>
              <button
                onClick={() => {
                  router.push("/examples")
                  onClose()
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/50 transition-colors text-left"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Examples</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">↑</kbd>{" "}
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">↓</kbd> to navigate,{" "}
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">Enter</kbd> to select,{" "}
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}
