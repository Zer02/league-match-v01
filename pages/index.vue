<template>
  <div class="home-page dark-theme">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="logo">LeagueMatch</div>
      <div class="auth-actions" v-if="!user">
        <button @click="router.push('/login')" class="btn-outline">Log In</button>
        <button @click="router.push('/signup')" class="btn-primary">Sign Up</button>
      </div>
      <div v-else class="user-actions">
        <button @click="router.push('/dashboard')" class="btn-primary">
          Go to Dashboard
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Find Your Perfect Tennis Match</h1>
        <p>Competitive matchmaking • Skill tracking • League play</p>

        <div class="cta-buttons">
          <button @click="router.push('/signup')" class="btn-primary btn-large">
            Join the League
          </button>
          <button @click="scrollToFeatures" class="btn-outline btn-large">
            Learn More
          </button>
        </div>
      </div>
      <div class="hero-image">
        <img src="../public/images/tennis-hero.jpg" alt="Tennis players">
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" ref="featuresSection">
      <h2>Why LeagueMatch?</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">🎾</div>
          <h3>Smart Matchmaking</h3>
          <p>Our algorithm considers skill level, location, and playing style</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Advanced Stats</h3>
          <p>Track serves, winners, and unforced errors with our match tracker</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <h3>League Play</h3>
          <p>Compete in seasonal leagues with division promotions</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📍</div>
          <h3>Court Finder</h3>
          <p>Discover available courts near you with real-time availability</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🤝</div>
          <h3>Community Events</h3>
          <p>Join local tournaments and social play events</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Mobile Friendly</h3>
          <p>Track matches and stats on the go with our mobile app</p>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <h2>Players Love Us</h2>
      <div class="testimonial-carousel">
        <div class="testimonial">
          <p>"Improved my UTR by 1.5 in just 3 months!"</p>
          <div class="player-info">
            <span>- Sarah K., 4.5 NTRP</span>
          </div>
        </div>
        <div class="testimonial">
          <p>"Finally found players at my level in my area"</p>
          <div class="player-info">
            <span>- Michael T., 3.5 NTRP</span>
          </div>
        </div>
        <div class="testimonial">
          <p>"Better than all the other apps I've tried"</p>
          <div class="player-info">
            <span>- Clyve W., 3.0 NTRP</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-links">
        <a @click="scrollToTop">Home</a>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <NuxtLink to="/privacy">Privacy</NuxtLink>
      </div>
      <div class="social-login-hint">
        <p>Quick sign up with:</p>
        <div class="social-icons">
          <button @click="signInWithGoogle" class="social-btn google">
            <IconGoogle /> Google
          </button>
          <button @click="signInWithApple" class="social-btn apple">
            <IconApple /> Apple
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const featuresSection = ref(null)

const scrollToFeatures = () => {
  featuresSection.value.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/setup-profile'
    }
  })
  if (error) console.error(error)
}

const signInWithApple = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: window.location.origin + '/setup-profile'
    }
  })
  if (error) console.error(error)
}
</script>

<style scoped>
.home-page {
  max-width: 100%;
  overflow-x: hidden;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
}

.auth-actions,
.user-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.btn-outline {
  background: white;
  color: #4CAF50;
  padding: 0.75rem 1.5rem;
  border: 2px solid #4CAF50;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4rem 5%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-content {
  max-width: 600px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #7f8c8d;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.hero-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.features {
  padding: 5rem 5%;
  text-align: center;
}

.features h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.testimonials {
  padding: 5rem 5%;
  background: #f8f9fa;
  text-align: center;
}

.testimonials h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.testimonial-carousel {
  max-width: 800px;
  margin: 0 auto;
}

.testimonial {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 5%;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-links a {
  color: white;
  cursor: pointer;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.google {
  background: white;
  color: #4285F4;
}

.apple {
  background: black;
  color: white;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-image {
    order: -1;
    margin-bottom: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
  }
}
</style>