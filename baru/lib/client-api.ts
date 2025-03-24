// Client-side API functions for public-facing features

/**
 * Submit contact form
 */
export const submitContactForm = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to submit contact form")
    }

    return data
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }
}

/**
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to subscribe to newsletter")
    }

    return data
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    throw error
  }
}

