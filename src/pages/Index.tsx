
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Target, 
  Trophy, 
  BarChart3, 
  Users, 
  Play,
  CheckCircle,
  TrendingUp,
  Calendar
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "Track Workouts",
      description: "Log your exercises, duration, and calories burned with ease"
    },
    {
      icon: Trophy,
      title: "Set Goals",
      description: "Create personalized fitness goals and track your progress"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Visualize your progress with detailed charts and insights"
    },
    {
      icon: CheckCircle,
      title: "Earn Badges",
      description: "Stay motivated with achievement badges and milestones"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      quote: "FitTrack Pro helped me stay consistent and reach my fitness goals faster than ever!",
      achievement: "Lost 20 lbs in 3 months"
    },
    {
      name: "Mike Chen",
      quote: "The badge system keeps me motivated. I love earning new achievements!",
      achievement: "30-day workout streak"
    },
    {
      name: "Emma Davis",
      quote: "The analytics feature shows exactly how I'm improving. It's incredibly motivating!",
      achievement: "Improved strength by 40%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Transform Your Fitness</span>
              <br />
              <span className="text-gray-900">Journey Today</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Track your workouts, set achievable goals, and stay motivated with our comprehensive 
              fitness tracking platform designed for your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-fitness-gradient hover:opacity-90 transition-opacity">
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/workout-plans">
                <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50">
                  <Calendar className="w-5 h-5 mr-2" />
                  View Workout Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to keep you motivated and on track
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="fitness-card hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-xl opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500K+</div>
              <div className="text-xl opacity-90">Workouts Logged</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-xl opacity-90">Goal Achievement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real people
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="fitness-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-green-600 font-medium">{testimonial.achievement}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Fitness?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of others who have already started their fitness journey with FitTrack Pro
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-fitness-gradient hover:opacity-90 transition-opacity">
              <TrendingUp className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-fitness-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl">FitTrack Pro</span>
          </div>
          <p className="text-gray-400">
            © 2024 FitTrack Pro. Built with ❤️ for fitness enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
