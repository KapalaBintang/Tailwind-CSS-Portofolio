// API service functions for contacts and subscribers

// Contacts API
export const fetchContacts = async (filters?: { status?: string, search?: string }) => {
  try {
    let url = '/api/admin/contacts'
    const params = new URLSearchParams()
    
    if (filters?.status && filters.status !== 'all') {
      params.append('status', filters.status)
    }
    
    if (filters?.search) {
      params.append('search', filters.search)
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch contacts')
    }
    
    const data = await response.json()
    return data.contacts
  } catch (error) {
    console.error('Error fetching contacts:', error)
    throw error
  }
}

export const getContact = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/contacts/${id}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch contact')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching contact:', error)
    throw error
  }
}

export const updateContactStatus = async (id: string, status: string) => {
  try {
    const response = await fetch(`/api/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update contact')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating contact:', error)
    throw error
  }
}

export const deleteContact = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/contacts/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete contact')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error deleting contact:', error)
    throw error
  }
}

// Subscribers API
export const fetchSubscribers = async (filters?: { status?: string, search?: string }) => {
  try {
    let url = '/api/admin/subscribers'
    const params = new URLSearchParams()
    
    if (filters?.status && filters.status !== 'all') {
      params.append('status', filters.status)
    }
    
    if (filters?.search) {
      params.append('search', filters.search)
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscribers')
    }
    
    const data = await response.json()
    return data.subscribers
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    throw error
  }
}

export const getSubscriber = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/subscribers/${id}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscriber')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching subscriber:', error)
    throw error
  }
}

export const updateSubscriberStatus = async (id: string, status: string) => {
  try {
    const response = await fetch(`/api/admin/subscribers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update subscriber')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating subscriber:', error)
    throw error
  }
}

export const deleteSubscriber = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/subscribers/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete subscriber')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error deleting subscriber:', error)
    throw error
  }
}

export const addSubscriber = async (email: string) => {
  try {
    const response = await fetch('/api/admin/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to add subscriber')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error adding subscriber:', error)
    throw error
  }
}

export const submitContactForm = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    const response = await fetch('/api/admin/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to submit contact form')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}

