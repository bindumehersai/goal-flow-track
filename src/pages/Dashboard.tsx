
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Target, 
  Trophy, 
  Calendar,
  TrendingUp,
  Plus,
  Timer,
  Flame,
  Footprints
} from "lucide-react";

const Dashboard = () => {
  const [todayStats, setTodayStats] = useState({
    workouts: 1,
    calories: 350,
    minutes: 45,
    steps: 8500
  });

  const [weeklyProgress, setWeeklyProgress] = useState([
    { day: 'Mon', workouts: 1, calories: 300 },
    { day: 'Tue', workouts: 1, calories: 450 },
    { day: 'Wed', workouts: 0, calories: 0 },
    { day: 'Thu', workouts: 1, calories: 380 },
    { day: 'Fri', workouts: 1, calories: 520 },
    { day: 'Sat', workouts: 0, calories: 0 },
    { day: 'Sun', workouts: 0, calories: 0 }
  ]);

  const [goals, setGoals] = useState([
    { name: "Weekly Workouts", current: 4, target: 5, unit: "workouts" },
    { name: "Monthly Calories", current: 8500, target: 12000, unit: "calories" },
    { name: "Daily Steps", current: 8500, target: 10000, unit: "steps" }
  ]);

  const [recentWorkouts, setRecentWorkouts] = useState([
    { 
      id: 1, 
      type: "Cardio", 
      name: "Morning Run", 
      duration: 30, 
      calories: 300, 
      date: "Today" 
    },
    { 
      id: 2, 
      type: "Strength", 
      name: "Upper Body", 
      duration: 45, 
      calories: 200, 
      date: "Yesterday" 
    },
    { 
      id: 3, 
      type: "Yoga", 
      name: "Evening Flow", 
      duration: 25, 
      calories: 120, 
      date: "2 days ago" 
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">Here's your fitness progress overview</p>
          </div>
          <Link to="/log-workout">
            <Button className="bg-fitness-gradient hover:opacity-90 transition-opacity mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Log New Workout
            </Button>
          </Link>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Workouts Today</p>
                  <p className="text-3xl font-bold text-gray-900">{todayStats.workouts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Calories Burned</p>
                  <p className="text-3xl font-bold text-gray-900">{todayStats.calories}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Minutes</p>
                  <p className="text-3xl font-bold text-gray-900">{todayStats.minutes}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Timer className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Steps</p>
                  <p className="text-3xl font-bold text-gray-900">{todayStats.steps.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Footprints className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goals Progress */}
          <div className="lg:col-span-2">
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal, index) => {
                  const percentage = (goal.current / goal.target) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-gray-600">
                          {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(percentage, 100)} 
                        className="h-3"
                      />
                      <div className="text-right text-xs text-gray-500">
                        {percentage.toFixed(0)}% complete
                      </div>
                    </div>
                  );
                })}
                <Link to="/goals">
                  <Button variant="outline" className="w-full mt-4">
                    <Target className="w-4 h-4 mr-2" />
                    Manage Goals
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Weekly Overview */}
            <Card className="fitness-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  This Week's Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs font-medium text-gray-600 mb-2">
                        {day.day}
                      </div>
                      <div 
                        className={`h-20 rounded-lg flex flex-col justify-end p-1 ${
                          day.workouts > 0 
                            ? 'bg-gradient-to-t from-green-500 to-green-300' 
                            : 'bg-gray-100'
                        }`}
                      >
                        <div className="text-xs text-white font-medium">
                          {day.workouts > 0 && `${day.workouts}w`}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {day.calories}cal
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Workouts & Quick Actions */}
          <div className="space-y-6">
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Recent Workouts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {workout.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {workout.type} • {workout.duration}min • {workout.calories}cal
                      </p>
                      <p className="text-xs text-gray-500">{workout.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="fitness-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/workout-plans" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Workout Plans
                  </Button>
                </Link>
                <Link to="/achievements" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </Link>
                <Link to="/goals" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
