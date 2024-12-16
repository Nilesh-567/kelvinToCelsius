"use client";

import { useState } from "react";
import { ThermometerIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>("celsius");
  const [toUnit, setToUnit] = useState<TemperatureUnit>("fahrenheit");
  const [result, setResult] = useState<string>("");

  const convertTemperature = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult("Please enter a valid number");
      return;
    }

    let converted: number;

    // First convert to Celsius as intermediate step
    let celsius: number;
    switch (fromUnit) {
      case "fahrenheit":
        celsius = (numValue - 32) * (5 / 9);
        break;
      case "kelvin":
        celsius = numValue - 273.15;
        break;
      default:
        celsius = numValue;
    }

    // Then convert from Celsius to target unit
    switch (toUnit) {
      case "fahrenheit":
        converted = celsius * (9 / 5) + 32;
        break;
      case "kelvin":
        converted = celsius + 273.15;
        break;
      default:
        converted = celsius;
    }

    setResult(`${converted.toFixed(2)}° ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`);
  };

  const handleReset = () => {
    setValue("");
    setFromUnit("celsius");
    setToUnit("fahrenheit");
    setResult("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 p-2">
              <ThermometerIcon className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Temperature Converter</CardTitle>
            <CardDescription>
              Convert between Celsius, Fahrenheit, and Kelvin with precision
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Temperature</label>
                <Input
                  type="number"
                  placeholder="Enter temperature"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">From Unit</label>
                <Select value={fromUnit} onValueChange={(value: TemperatureUnit) => setFromUnit(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Unit</label>
              <Select value={toUnit} onValueChange={(value: TemperatureUnit) => setToUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button onClick={convertTemperature} className="flex-1">
                Convert
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>

            {result && (
              <div className="mt-6 rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-2xl font-semibold text-primary">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}