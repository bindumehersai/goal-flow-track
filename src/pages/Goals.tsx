
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { 
  Target, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp,
  Calendar,
  Trophy,
  CheckCircle
} from "lucide-react";

const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Lose 10 pounds",
      category: "Weight Loss",
      target: 10,
      current: 3,
      unit: "lbs",
      deadline: "2024-03-01",
      status: "active"
    },
    {
      id: 2,
      name: "Run 5K in under 25 minutes",
      category: "Cardio",
      target: 25,
      current: 28,
      unit: "minutes",
      deadline: "2024-02-15",
      status: "active"
    },
    {
      id: 3,
      name: "Workout 4 times per week",
      category: "Consistency",
      target: 4,
      current: 3,
      unit: "workouts/week",
      deadline: "Ongoing",
      status: "active"
    },
    {
      id: 4,
      name: "Complete 30-day challenge",
      category: "Challenge",
      target: 30,
      current: 30,
      unit: "days",
      deadline: "2024-01-31",
      status: "completed"
    }
  ]);

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    category: "",
    target: "",
    unit: "",
    deadline: ""
  });

  const goalCategories = [
    "Weight Loss",
    "Weight Gain",
    "Strength",
    "Cardio",
    "Flexibility",
    "Consistency",
    "Challenge",
    "Other"
  ];

  const handleNewGoalChange = (field: string, value: string) => {
    setNewGoal(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoal.name || !newGoal.category || !newGoal.target || !newGoal.unit) {
      toast.error("Please fill in all required fields");
      return;
    }

    const goal = {
      id: Date.now(),
      name: newGoal.name,
      category: newGoal.category,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline || "Ongoing",
      status: "active" as const
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      name: "",
      category: "",
      target: "",
      unit: "",
      deadline: ""
    });
    setShowNewGoalForm(false);
    
    toast.success("New goal created! 🎯", {
      description: goal.name
    });
  };

  const deleteGoal = (id: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    toast.success("Goal deleted");
  };

  const markAsCompleted = (id: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, status: "completed" as const, current: goal.target }
        : goal
    ));
    toast.success("Congratulations! Goal completed! 🏆");
  };

  const getProgressPercentage = (goal: typeof goals[0]) => {
    if (goal.category === "Weight Loss") {
      return Math.min((goal.current / goal.target) * 100, 100);
    } else if (goal.category === "Cardio" && goal.name.includes("under")) {
      // For "under" goals, progress is inverse
      const improvement = goal.target - goal.current;
      const maxImprovement = goal.target * 0.3; // Assume 30% improvement is max
      return Math.min((improvement / maxImprovement) * 100, 100);
    }
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const activeGoals = goals.filter(goal => goal.status === "active");
  const completedGoals = goals.filter(goal => goal.status === "completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Fitness Goals
            </h1>
            <p className="text-gray-600">Set, track, and achieve your fitness objectives</p>
          </div>
          <Button 
            onClick={() => setShowNewGoalForm(true)}
            className="bg-fitness-gradient hover:opacity-90 transition-opacity mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Goal Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Goals</p>
                  <p className="text-3xl font-bold text-gray-900">{activeGoals.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Goals</p>
                  <p className="text-3xl font-bold text-gray-900">{completedGoals.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="fitness-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Goal Form */}
        {showNewGoalForm && (
          <Card className="fitness-card mb-8">
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalName">Goal Name *</Label>
                    <Input
                      id="goalName"
                      placeholder="e.g., Lose 10 pounds"
                      value={newGoal.name}
                      onChange={(e) => handleNewGoalChange("name", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newGoal.category} onValueChange={(value) => handleNewGoalChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {goalCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Value *</Label>
                    <Input
                      id="target"
                      type="number"
                      placeholder="10"
                      value={newGoal.target}
                      onChange={(e) => handleNewGoalChange("target", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Input
                      id="unit"
                      placeholder="lbs, minutes, workouts, etc."
                      value={newGoal.unit}
                      onChange={(e) => handleNewGoalChange("unit", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline (Optional)</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => handleNewGoalChange("deadline", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button type="submit" className="bg-fitness-gradient hover:opacity-90">
                    <Target className="w-4 h-4 mr-2" />
                    Create Goal
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowNewGoalForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Active Goals */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Goals</h2>
          {activeGoals.length === 0 ? (
            <Card className="fitness-card">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No active goals</h3>
                <p className="text-gray-600 mb-4">Create your first goal to start tracking your progress</p>
                <Button 
                  onClick={() => setShowNewGoalForm(true)}
                  className="bg-fitness-gradient hover:opacity-90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGoals.map((goal) => {
                const percentage = getProgressPercentage(goal);
                return (
                  <Card key={goal.id} className="fitness-card">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{goal.name}</CardTitle>
                          <p className="text-sm text-gray-600">{goal.category}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsCompleted(goal.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteGoal(goal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {goal.current} / {goal.target} {goal.unit}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{percentage.toFixed(0)}% complete</span>
                          {goal.deadline !== "Ongoing" && (
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(goal.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="fitness-card opacity-80">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {goal.name}
                          <Trophy className="w-5 h-5 text-yellow-500 ml-2" />
                        </CardTitle>
                        <p className="text-sm text-gray-600">{goal.category}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span className="text-green-600 font-medium">
                          {goal.target} {goal.unit}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
