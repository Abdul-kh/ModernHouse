"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, X } from "lucide-react"

interface Booking {
  id: string
  consultationType: string
  date: string
  time: string
  customer: {
    name: string
    email: string
    phone: string
  }
  projectDetails: string
  timestamp: string
  read?: boolean
}

export function BookingNotificationBadge() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const loadBookings = () => {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
        setBookings(storedBookings)
      } catch (error) {
        console.error('Error loading bookings:', error)
        setBookings([])
      }
    }

    loadBookings()
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bookings') {
        loadBookings()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    const interval = setInterval(loadBookings, 3000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const getUnreadCount = () => bookings.filter(booking => !booking.read).length

  const openDashboard = () => {
    // Trigger the dashboard keyboard shortcut
    const event = new KeyboardEvent('keydown', {
      key: 'B',
      ctrlKey: true,
      shiftKey: true
    })
    window.dispatchEvent(event)
  }

  const markAllAsRead = () => {
    const updatedBookings = bookings.map(booking => ({ ...booking, read: true }))
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
  }

  if (getUnreadCount() === 0) return null

  return (
    <>
      {/* Floating notification badge */}
      <div className="fixed bottom-24 right-6 z-50 animate-fade-in-up">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="relative bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all rounded-full p-4"
          size="lg"
        >
          <Bell className="h-6 w-6" />
          {getUnreadCount() > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 min-w-[24px] h-6 flex items-center justify-center animate-pulse"
            >
              {getUnreadCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Quick notification panel */}
      {isVisible && (
        <div className="fixed bottom-32 right-6 z-50 w-80 glass-card border-border/50 shadow-2xl animate-fade-in-up">
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">New Bookings</h3>
                <Badge variant="destructive" className="animate-pulse">
                  {getUnreadCount()}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {bookings
              .filter(booking => !booking.read)
              .slice(0, 3)
              .map((booking) => (
                <div key={booking.id} className="p-4 border-b border-border/20 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{booking.customer.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{booking.consultationType}</p>
                      <p className="text-xs text-muted-foreground">{booking.date} at {booking.time}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="p-3 border-t border-border/30 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="flex-1 text-xs"
            >
              Mark All Read
            </Button>
            <Button
              size="sm"
              onClick={openDashboard}
              className="flex-1 text-xs"
            >
              View All
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
