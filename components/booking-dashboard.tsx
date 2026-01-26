"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Trash2, Download } from "lucide-react"
import { format } from "date-fns"

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

export function BookingDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Load bookings from localStorage and set up refresh listener
  useEffect(() => {
    const loadBookings = () => {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
        console.log('📋 Loading bookings:', storedBookings)
        setBookings(storedBookings)
      } catch (error) {
        console.error('Error loading bookings:', error)
        setBookings([])
      }
    }

    loadBookings()
    
    // Set up storage event listener for cross-tab updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bookings') {
        loadBookings()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also check periodically for updates (fallback)
    const interval = setInterval(loadBookings, 2000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [refreshKey])

  const deleteBooking = (id: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== id)
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    console.log('🗑️ Booking deleted:', id)
  }

  const markAsRead = (id: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, read: true } : booking
    )
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
  }

  const markAsUnread = (id: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, read: false } : booking
    )
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
  }

  const getUnreadCount = () => bookings.filter(booking => !booking.read).length

  const exportBookings = () => {
    const dataStr = JSON.stringify(bookings, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `bookings-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    console.log('📥 Bookings exported')
  }

  const exportCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Type', 'Date', 'Time', 'Details', 'Booked At'].join(','),
      ...bookings.map(booking => [
        booking.id,
        `"${booking.customer.name}"`,
        booking.customer.email,
        booking.customer.phone,
        booking.consultationType,
        booking.date,
        booking.time,
        `"${booking.projectDetails || ''}"`,
        format(new Date(booking.timestamp), 'yyyy-MM-dd HH:mm:ss')
      ].join(','))
    ].join('\n')
    
    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
    const exportFileDefaultName = `bookings-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.csv`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    console.log('📊 Bookings exported as CSV')
  }

  const clearAllBookings = () => {
    if (confirm(`Are you sure you want to delete all ${bookings.length} bookings? This action cannot be undone.`)) {
      setBookings([])
      localStorage.removeItem('bookings')
      console.log('🗑️ All bookings cleared')
    }
  }

  const sendTestNotification = () => {
    const testBooking: Booking = {
      id: Date.now().toString(),
      consultationType: 'test',
      date: format(new Date(), 'PPP'),
      time: '12:00',
      customer: {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+1234567890'
      },
      projectDetails: 'This is a test booking to verify the dashboard is working.',
      timestamp: new Date().toISOString()
    }
    
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, testBooking]))
    setRefreshKey(prev => prev + 1)
    console.log('🧪 Test booking added')
  }

  // Only show in development or with a special key combo
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'B') {
        setIsVisible(!isVisible)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden glass-card border-border/50">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Booking Management Dashboard
              </CardTitle>
              {getUnreadCount() > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {getUnreadCount()} new
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={sendTestNotification}
                className="flex items-center gap-2"
              >
                🧪 Test
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportCSV}
                disabled={bookings.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportBookings}
                disabled={bookings.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                JSON
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllBookings}
                disabled={bookings.length === 0}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                Close (Ctrl+Shift+B)
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">Bookings will appear here when customers schedule consultations.</p>
                  <Button onClick={sendTestNotification} variant="outline" className="flex items-center gap-2 mx-auto">
                    🧪 Add Test Booking
                  </Button>
                </div>
              ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">
                      Total Bookings: <span className="text-primary">{bookings.length}</span>
                    </h3>
                    {getUnreadCount() > 0 && (
                      <Badge variant="secondary" className="animate-pulse">
                        {getUnreadCount()} unread
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => bookings.forEach(b => !b.read && markAsRead(b.id))}
                      disabled={getUnreadCount() === 0}
                    >
                      Mark All Read
                    </Button>
                    <Badge variant="outline" className="text-xs">
                      Press Ctrl+Shift+B to toggle
                    </Badge>
                  </div>
                </div>
              
              {bookings.map((booking) => (
                <Card key={booking.id} className={`glass-card border-border/30 transition-all ${
                  !booking.read ? 'border-primary/50 bg-primary/5' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {!booking.read && (
                            <Badge variant="destructive" className="animate-pulse text-xs">
                              NEW
                            </Badge>
                          )}
                          <Badge variant="outline" className="capitalize">
                            {booking.consultationType}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {booking.time}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium">{booking.customer.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="text-sm">{booking.customer.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="text-sm">{booking.customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Booked: {format(new Date(booking.timestamp), 'MMM dd, yyyy HH:mm')}
                            </span>
                          </div>
                        </div>
                        
                        {booking.projectDetails && (
                          <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">{booking.projectDetails}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                          <div className="flex gap-2">
                            {!booking.read ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markAsRead(booking.id)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                ✓ Mark Read
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markAsUnread(booking.id)}
                                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              >
                                ○ Mark Unread
                              </Button>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteBooking(booking.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
