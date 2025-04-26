<template>
  <div class="dashboard">
    <!-- Dashboard Header -->
    <header class="dashboard-header">
      <div class="header-left">
        <h1>Player Dashboard</h1>
        <p class="welcome-message">Welcome back, {{ userEmail }}</p>
      </div>
      <div class="header-right">
        <div class="user-profile">
          <span class="user-avatar">{{ userInitial }}</span>
          <button @click="handleLogout" class="logout-btn">
            <span>Log Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Dashboard Content -->
    <div class="dashboard-content">
      <!-- Stats Overview -->
      <section class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <h3>Current Rank</h3>
            <p class="stat-value">#24</p>
            <p class="stat-change positive">↑ 3 spots this month</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-info">
            <h3>UTR Rating</h3>
            <p class="stat-value">6.42</p>
            <p class="stat-change positive">+0.18 this month</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎾</div>
          <div class="stat-info">
            <h3>Matches Played</h3>
            <p class="stat-value">12</p>
            <p class="stat-change">3 this month</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-info">
            <h3>Win Streak</h3>
            <p class="stat-value">5</p>
            <p class="stat-change positive">Current streak</p>
          </div>
        </div>
      </section>

      <!-- Two-column layout -->
      <div class="columns-container">
        <!-- Left Column -->
        <div class="column-left">
          <!-- Upcoming Matches -->
          <section class="dashboard-section">
            <div class="section-header">
              <h2>Upcoming Matches</h2>
              <button class="section-action">View All</button>
            </div>
            <div class="matches-list">
              <div class="match-card" v-for="match in upcomingMatches" :key="match.id">
                <div class="match-date">
                  <div class="match-day">{{ match.day }}</div>
                  <div class="match-month">{{ match.month }}</div>
                </div>
                <div class="match-details">
                  <h3>vs {{ match.opponent }}</h3>
                  <p class="match-time">{{ match.time }} • {{ match.location }}</p>
                  <div class="match-stats">
                    <span class="match-stat">Previous: W 6-3, 6-4</span>
                    <span class="match-stat">UTR: {{ match.opponentUTR }}</span>
                  </div>
                </div>
                <button class="match-action">Details</button>
              </div>
            </div>
          </section>

          <!-- Recent Activity -->
          <section class="dashboard-section">
            <div class="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div class="activity-list">
              <div class="activity-item" v-for="activity in recentActivity" :key="activity.id">
                <div class="activity-icon">{{ activity.icon }}</div>
                <div class="activity-content">
                  <p>{{ activity.message }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column -->
        <div class="column-right">
          <!-- Performance Chart -->
          <section class="dashboard-section">
            <div class="section-header">
              <h2>Rating Progress</h2>
              <div class="time-filters">
                <button class="time-filter active">3M</button>
                <button class="time-filter">6M</button>
                <button class="time-filter">1Y</button>
              </div>
            </div>
            <div class="chart-placeholder">
              <!-- In a real app, you would use a chart library here -->
              <!-- <img src="~/assets/images/rating-chart-placeholder.png" alt="Rating progress chart" class="chart-image"> -->
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="legend-color" style="background: #4CAF50;"></span>
                  <span>Your Rating</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background: #FF9800;"></span>
                  <span>Division Avg</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Suggested Players -->
          <section class="dashboard-section">
            <div class="section-header">
              <h2>Suggested Players</h2>
              <button class="section-action">Refresh</button>
            </div>
            <div class="players-list">
              <div class="player-card" v-for="player in suggestedPlayers" :key="player.id">
                <div class="player-avatar">{{ player.initials }}</div>
                <div class="player-info">
                  <h3>{{ player.name }}</h3>
                  <p class="player-stats">
                    <span>UTR: {{ player.utr }}</span>
                    <span>•</span>
                    <span>{{ player.distance }} mi away</span>
                  </p>
                </div>
                <button class="player-action">Challenge</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// User data
const userEmail = computed(() => user.value?.email || 'Player')
const userInitial = computed(() => userEmail.value.charAt(0).toUpperCase())

// Sample data - in a real app, you would fetch this from your database
const upcomingMatches = ref([
  { id: 1, day: '15', month: 'JUN', opponent: 'Alex M.', time: '4:30 PM', location: 'Central Park Courts', opponentUTR: '6.35' },
  { id: 2, day: '22', month: 'JUN', opponent: 'Sarah J.', time: '10:00 AM', location: 'Riverside Club', opponentUTR: '6.50' },
  { id: 3, day: '28', month: 'JUN', opponent: 'Michael T.', time: '6:00 PM', location: 'Downtown Tennis Center', opponentUTR: '6.20' }
])

const recentActivity = ref([
  { id: 1, icon: '🏆', message: 'You defeated Carlos G. 6-4, 7-5', time: '2 hours ago' },
  { id: 2, icon: '📈', message: 'Your UTR increased to 6.42 (+0.05)', time: '1 day ago' },
  { id: 3, icon: '🎾', message: 'New match scheduled with Alex M.', time: '3 days ago' },
  { id: 4, icon: '👥', message: 'You were added to Summer League Division 2', time: '1 week ago' }
])

const suggestedPlayers = ref([
  { id: 1, initials: 'JM', name: 'Jessica M.', utr: '6.38', distance: '2.5' },
  { id: 2, initials: 'RK', name: 'Ryan K.', utr: '6.45', distance: '3.1' },
  { id: 3, initials: 'TP', name: 'Taylor P.', utr: '6.30', distance: '1.8' }
])

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>
/* Base Styles */
.dashboard {
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-left h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.welcome-message {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #e74c3c;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #fdeaea;
}

/* Dashboard Content */
.dashboard-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background-color: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0.25rem 0;
}

.stat-change {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.stat-change.positive {
  color: #4CAF50;
}

/* Columns Layout */
.columns-container {
  display: flex;
  gap: 2rem;
}

.column-left {
  flex: 1;
  min-width: 0;
}

.column-right {
  width: 380px;
}

/* Dashboard Sections */
.dashboard-section {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.03);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.4rem;
  font-weight: 600;
}

.section-action {
  background: none;
  border: none;
  color: #3498db;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.section-action:hover {
  background-color: #f0f7fc;
}

.time-filters {
  display: flex;
  gap: 0.5rem;
}

.time-filter {
  background: none;
  border: 1px solid #dfe6e9;
  color: #7f8c8d;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  cursor: pointer;
}

.time-filter.active {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
}

/* Matches List */
.matches-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.match-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ecf0f1;
  transition: background-color 0.2s;
}

.match-card:hover {
  background-color: #f8f9fa;
}

.match-date {
  text-align: center;
  min-width: 50px;
}

.match-day {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1;
}

.match-month {
  font-size: 0.8rem;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.match-details {
  flex: 1;
}

.match-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.match-time {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.match-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
}

.match-stat {
  color: #7f8c8d;
}

.match-action {
  background-color: #f8f9fa;
  border: none;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.match-action:hover {
  background-color: #ecf0f1;
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.activity-icon {
  width: 36px;
  height: 36px;
  background-color: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.activity-time {
  font-size: 0.8rem;
  color: #7f8c8d;
}

/* Chart Placeholder */
.chart-placeholder {
  height: 250px;
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.chart-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chart-legend {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

/* Players List */
.players-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.player-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ecf0f1;
}

.player-avatar {
  width: 40px;
  height: 40px;
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.player-info {
  flex: 1;
}

.player-info h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.player-stats {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.player-action {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.player-action:hover {
  background-color: #45a049;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .columns-container {
    flex-direction: column;
  }

  .column-right {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }

  .dashboard-content {
    padding: 1rem;
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
}
</style>