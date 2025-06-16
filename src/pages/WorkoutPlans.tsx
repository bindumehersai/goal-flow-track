
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  Play, 
  Clock, 
  TrendingUp, 
  Star,
  Users,
  Target,
  Dumbbell,
  Heart,
  Zap
} from "lucide-react";

const WorkoutPlans = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  const workoutPlans = [
    {
      id: 1,
      name: "Beginner's Full Body",
      description: "Perfect for those just starting their fitness journey. Build strength and endurance with simple, effective exercises.",
      difficulty: "Beginner",
      duration: 30,
      workouts: 12,
      category: "Strength",
      rating: 4.8,
      participants: 2.5,
      image: "💪",
      features: ["No equipment needed", "Video guides", "Progressive difficulty"],
      goals: ["Build strength", "Improve form", "Create routine"]
    },
    {
      id: 2,
      name: "HIIT Cardio Blast",
      description: "High-intensity interval training to boost your cardiovascular health and burn calories efficiently.",
      difficulty: "Intermediate",
      duration: 25,
      workouts: 8,
      category: "Cardio",
      rating: 4.7,
      participants: 1.8,
      image: "🔥",
      features: ["High calorie burn", "Quick workouts", "No equipment"],
      goals: ["Burn fat", "Improve cardio", "Save time"]
    },
    {
      id: 3,
      name: "Yoga Flow & Flexibility",
      description: "Improve flexibility, balance, and mindfulness with guided yoga sessions for all levels.",
      difficulty: "Beginner",
      duration: 45,
      workouts: 10,
      category: "Flexibility",
      rating: 4.9,
      participants: 3.2,
      image: "🧘",
      features: ["Stress relief", "Better flexibility", "Mind-body connection"],
      goals: ["Reduce stress", "Improve flexibility", "Better sleep"]
    },
    {
      id: 4,
      name: "Advanced Strength Builder",
      description: "Take your strength training to the next level with compound movements and progressive overload.",
      difficulty: "Advanced",
      duration: 60,
      workouts: 16,
      category: "Strength",
      rating: 4.6,
      participants: 0.9,
      image: "🏋️",
      features: ["Progressive overload", "Compound movements", "Detailed tracking"],
      goals: ["Build muscle", "Increase strength", "Advanced techniques"]
    },
    {
      id: 5,
      name: "Core & Abs Focus",
      description: "Strengthen your core with targeted exercises that improve stability and definition.",
      difficulty: "Intermediate",
      duration: 20,
      workouts: 6,
      category: "Core",
      rating: 4.5,
      participants: 2.1,
      image: "💥",
      features: ["Core stability", "Ab definition", "Functional strength"],
      goals: ["Stronger core", "Better posture", "Defined abs"]
    },
    {
      id: 6,
      name: "Marathon Training",
      description: "Comprehensive 12-week program to prepare you for your first marathon or improve your time.",
      difficulty: "Advanced",
      duration: 90,
      workouts: 36,
      category: "Cardio",
      rating: 4.8,
      participants: 0.7,
      image: "🏃",
      features: ["Structured progression", "Race preparation", "Injury prevention"],
      goals: ["Complete marathon", "Improve endurance", "Beat personal record"]
    }
  ];

  const filters = ["All", "Beginner", "Intermediate", "Advanced", "Strength", "Cardio", "Flexibility", "Core"];
  
  const filteredPlans = selectedFilter === "All" 
    ? workoutPlans 
    : workoutPlans.filter(plan => 
        plan.difficulty === selectedFilter || plan.category === selectedFilter
      );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Strength": return Dumbbell;
      case "Cardio": return Heart;
      case "Flexibility": return Star;
      case "Core": return Zap;
      default: return Target;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workout Plans
          </h1>
          <p className="text-gray-600">
            Choose from our expertly designed workout programs to achieve your fitness goals
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Workout Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => {
            const CategoryIcon = getCategoryIcon(plan.category);
            return (
              <Card key={plan.id} className="fitness-card hover:scale-105 transition-transform duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{plan.image}</div>
                    <Badge className={getDifficultyColor(plan.difficulty)}>
                      {plan.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Plan Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {plan.duration} min
                    </div>
                    <div className="flex items-center">
                      <CategoryIcon className="w-4 h-4 mr-1" />
                      {plan.workouts} workouts
                    </div>
                  </div>

                  {/* Rating & Participants */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{plan.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {plan.participants}k participants
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {plan.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Goals:</h4>
                    <ul className="space-y-1">
                      {plan.goals.map((goal, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <Target className="w-3 h-3 mr-2 text-green-500" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Link to="/log-workout" className="flex-1">
                      <Button className="w-full bg-fitness-gradient hover:opacity-90 transition-opacity">
                        <Play className="w-4 h-4 mr-2" />
                        Start Plan
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="fitness-card mt-12 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-6">
              Choose a workout plan that matches your fitness level and goals. 
              Start today and see amazing results in just a few weeks!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/goals">
                <Button variant="secondary" size="lg">
                  <Target className="w-5 h-5 mr-2" />
                  Set Your Goals
                </Button>
              </Link>
              <Link to="/log-workout">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Play className="w-5 h-5 mr-2" />
                  Log First Workout
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutPlans;
