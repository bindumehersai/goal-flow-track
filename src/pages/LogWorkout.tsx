
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { 
  Save, 
  Timer, 
  Flame, 
  Activity,
  Calendar
} from "lucide-react";

const LogWorkout = () => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    name: "",
    type: "",
    duration: "",
    calories: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const workoutTypes = [
    "Cardio",
    "Strength Training",
    "Yoga",
    "Pilates",
    "Swimming",
    "Cycling",
    "Running",
    "Walking",
    "Dance",
    "Sports",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setWorkout(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workout.name || !workout.type || !workout.duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate saving workout
    console.log("Saving workout:", workout);
    
    toast.success("Workout logged successfully! 🎉", {
      description: `${workout.name} - ${workout.duration} minutes`
    });

    // Reset form
    setWorkout({
      name: "",
      type: "",
      duration: "",
      calories: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    });

    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const suggestedWorkouts = [
    { name: "Morning Run", type: "Cardio", duration: 30, calories: 300 },
    { name: "Push Day", type: "Strength Training", duration: 45, calories: 200 },
    { name: "Yoga Flow", type: "Yoga", duration: 25, calories: 120 },
    { name: "Evening Walk", type: "Walking", duration: 20, calories: 100 }
  ];

  const fillSuggestion = (suggestion: typeof suggestedWorkouts[0]) => {
    setWorkout(prev => ({
      ...prev,
      name: suggestion.name,
      type: suggestion.type,
      duration: suggestion.duration.toString(),
      calories: suggestion.calories.toString()
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Log Your Workout
          </h1>
          <p className="text-gray-600">Track your exercise and progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Workout Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Workout Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Morning Run"
                        value={workout.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Workout Type *</Label>
                      <Select value={workout.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {workoutTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="flex items-center">
                        <Timer className="w-4 h-4 mr-1" />
                        Duration (minutes) *
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="30"
                        value={workout.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="calories" className="flex items-center">
                        <Flame className="w-4 h-4 mr-1" />
                        Calories Burned
                      </Label>
                      <Input
                        id="calories"
                        type="number"
                        placeholder="300"
                        value={workout.calories}
                        onChange={(e) => handleInputChange("calories", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={workout.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="How did the workout feel? Any achievements or observations..."
                      value={workout.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-fitness-gradient hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Log Workout
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle>Quick Fill</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Click to auto-fill common workouts:
                </p>
                <div className="space-y-2">
                  {suggestedWorkouts.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => fillSuggestion(suggestion)}
                    >
                      <div>
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-xs text-gray-500">
                          {suggestion.type} • {suggestion.duration}min • {suggestion.calories}cal
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fitness-card">
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">
                    Be honest about duration and intensity for accurate tracking
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">
                    Add notes about how you felt or any achievements
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">
                    Consistency is more important than perfection
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogWorkout;
