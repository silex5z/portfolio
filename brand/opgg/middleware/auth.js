export default async function({ $auth, redirect }) {
  // If the user is not authenticated
  if (!$auth.isAuthenticated) {
    return redirect('/login')
  }

  if (!this.$auth.loggedIn) {
    if (this.$auth.getToken('local')) {
      try {
        await this.$auth.fetchUser()
        if (this.$auth.loggedIn) {
          console.log('Authentication successful!')
          return redirect('/main')
        } else {
          console.log('Authentication failed...')
          return redirect('/login')
        }
      } catch (err) {
        console.log('Authentication error...')
        return redirect('/login')
      }
    } else {
      console.log('No token found, not authenticating...')
      return redirect('/login')
    }
  } else {
    console.log('Already authenticated!')
    return redirect('/main')
  }
}
