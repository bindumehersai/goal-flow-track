
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  Calendar,
  TrendingUp,
  Award,
  Crown,
  Medal,
  Zap
} from "lucide-react";

const Achievements = () => {
  const [achievements] = useState([
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first workout",
      icon: Target,
      earned: true,
      earnedDate: "2024-01-15",
      category: "Getting Started",
      rarity: "common"
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "Complete 7 workouts in one week",
      icon: Calendar,
      earned: true,
      earnedDate: "2024-01-22",
      category: "Consistency",
      rarity: "uncommon"
    },
    {
      id: 3,
      name: "Calorie Crusher",
      description: "Burn 500 calories in a single workout",
      icon: Flame,
      earned: true,
      earnedDate: "2024-01-18",
      category: "Performance",
      rarity: "common"
    },
    {
      id: 4,
      name: "30-Day Champion",
      description: "Workout for 30 consecutive days",
      icon: Crown,
      earned: true,
      earnedDate: "2024-02-14",
      category: "Milestones",
      rarity: "rare"
    },
    {
      id: 5,
      name: "Goal Getter",
      description: "Complete your first fitness goal",
      icon: Trophy,
      earned: true,
      earnedDate: "2024-01-31",
      category: "Goals",
      rarity: "uncommon"
    },
    {
      id: 6,
      name: "Lightning Fast",
      description: "Complete a workout in under 15 minutes",
      icon: Zap,
      earned: false,
      earnedDate: null,
      category: "Performance",
      rarity: "common"
    },
    {
      id: 7,
      name: "Marathon Master",
      description: "Complete a 60+ minute workout",
      icon: Award,
      earned: false,
      earnedDate: null,
      category: "Performance",
      rarity: "uncommon"
    },
    {
      id: 8,
      name: "Perfect Week",
      description: "Hit all your daily goals for 7 days straight",
      icon: Star,
      earned: false,
      earnedDate: null,
      category: "Consistency",
      rarity: "rare"
    },
    {
      id: 9,
      name: "Strength Legend",
      description: "Complete 100 strength training workouts",
      icon: Medal,
      earned: false,
      earnedDate: null,
      category: "Milestones",
      rarity: "epic"
    },
    {
      id: 10,
      name: "Fitness Master",
      description: "Earn all other achievements",
      icon: Crown,
      earned: false,
      earnedDate: null,
      category: "Ultimate",
      rarity: "legendary"
    }
  ]);

  const categories = ["All", "Getting Started", "Consistency", "Performance", "Goals", "Milestones", "Ultimate"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAchievements = selectedCategory === "All" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalAchievements = achievements.length;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800";
      case "uncommon": return "bg-green-100 text-green-800";
      case "rare": return "bg-blue-100 text-blue-800";
      case "epic": return "bg-purple-100 text-purple-800";
      case "legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return "⚪";
      case "uncommon": return "🟢";
      case "rare": return "🔵";
      case "epic": return "🟣";
      case "legendary": return "🟡";
      default: return "⚪";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Achievements
          </h1>
          <p className="text-gray-600">
            Track your milestones and unlock new badges as you progress
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {earnedAchievements.length} / {totalAchievements}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round((earnedAchievements.length / totalAchievements) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Latest Badge</p>
                  <p className="text-lg font-bold text-gray-900">
                    {earnedAchievements.length > 0 
                      ? earnedAchievements
                          .sort((a, b) => new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime())[0]
                          .name
                      : "None yet"
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card 
                key={achievement.id} 
                className={`fitness-card transition-all duration-300 ${
                  achievement.earned 
                    ? "bg-gradient-to-br from-white to-yellow-50 border-yellow-200 shadow-lg" 
                    : "opacity-60 grayscale"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned 
                            ? "bg-gradient-to-r from-blue-500 to-green-500" 
                            : "bg-gray-200"
                        }`}
                      >
                        <Icon 
                          className={`w-6 h-6 ${
                            achievement.earned ? "text-white" : "text-gray-400"
                          }`} 
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {getRarityIcon(achievement.rarity)} {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {achievement.earned && (
                      <div className="text-right">
                        <div className="text-2xl animate-badge-bounce">🏆</div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{achievement.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {achievement.category}
                    </Badge>
                    {achievement.earned && achievement.earnedDate && (
                      <span className="text-xs text-gray-500">
                        Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress Motivation */}
        <Card className="fitness-card mt-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Keep Going!</h3>
            <p className="text-blue-100 mb-4">
              You're {totalAchievements - earnedAchievements.length} badges away from completing your collection.
            </p>
            <p className="text-sm text-blue-200">
              Every workout brings you closer to your next achievement. Stay consistent and unlock new milestones!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Achievements;
