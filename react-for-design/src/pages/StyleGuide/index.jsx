import React from "react";
import { ArrowLeft, Bell, Star, MapPin, Clock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StyleGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-accent/50"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Style Guide</h1>
      </div>

      {/* Colors */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium">Colors</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-primary">
            <div className="mb-2 font-medium text-primary-foreground">
              Primary
            </div>
            <div className="text-sm text-primary-foreground/80">#DBA858</div>
          </div>
          <div className="p-4 rounded-2xl bg-secondary">
            <div className="mb-2 font-medium text-secondary-foreground">
              Secondary
            </div>
            <div className="text-sm text-secondary-foreground/80">#E8C5C5</div>
          </div>
          <div className="p-4 rounded-2xl bg-accent">
            <div className="mb-2 font-medium">Accent</div>
            <div className="text-sm text-muted-foreground">#F4F4F5</div>
          </div>
          <div className="p-4 rounded-2xl bg-background border">
            <div className="mb-2 font-medium">Background</div>
            <div className="text-sm text-muted-foreground">#FFFFFF</div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Heading 1</h1>
            <div className="text-sm text-muted-foreground">
              24px / Semi Bold
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium">Heading 2</h2>
            <div className="text-sm text-muted-foreground">18px / Medium</div>
          </div>
          <div>
            <h3 className="text-base font-medium">Heading 3</h3>
            <div className="text-sm text-muted-foreground">16px / Medium</div>
          </div>
          <div>
            <p className="text-base">Body Text</p>
            <div className="text-sm text-muted-foreground">16px / Regular</div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Caption Text</p>
            <div className="text-sm text-muted-foreground">14px / Regular</div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium">Buttons</h2>
        <div className="space-y-4">
          <button className="w-full py-4 font-medium text-primary-foreground bg-primary rounded-xl">
            Primary Button
          </button>
          <button className="w-full py-4 font-medium bg-accent text-foreground rounded-xl">
            Secondary Button
          </button>
          <button className="w-full py-4 font-medium border rounded-xl border-border/40">
            Outline Button
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium">Cards</h2>

        {/* Service Card */}
        <div className="mb-4">
          <div className="p-4 border rounded-2xl border-border/40">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Service Name</h3>
              <span className="font-medium text-primary">$99</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              60 min
            </div>
          </div>
        </div>

        {/* Artist Info Card */}
        <div className="mb-4">
          <div className="p-4 border rounded-2xl border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 overflow-hidden rounded-full">
                <img
                  src="https://i.pravatar.cc/64"
                  alt="Artist"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-medium">Artist Name</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (127 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>2.3 km away</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Slot Card */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            <button className="p-3 text-sm font-medium border rounded-xl border-border/40">
              9:00 AM
            </button>
            <button className="p-3 text-sm font-medium border rounded-xl border-primary bg-primary/5 text-primary">
              10:00 AM
            </button>
            <button className="p-3 text-sm font-medium border rounded-xl border-border/40 bg-accent/50 text-muted-foreground">
              11:00 AM
            </button>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium">Form Elements</h2>

        {/* Text Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Text Input</label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 border rounded-xl border-border/40 bg-background"
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Phone Input</label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 border rounded-xl border-border/40 bg-background"
          />
        </div>

        {/* Checkbox */}
        <div className="mb-4">
          <label className="flex items-center p-4 border rounded-xl border-border/40">
            <input type="checkbox" className="mr-3" />
            <span>Hair Styling</span>
          </label>
        </div>
      </section>

      {/* Icons */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium">Icons</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <Bell className="w-6 h-6" />
            <span className="mt-2 text-sm text-muted-foreground">Bell</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-6 h-6" />
            <span className="mt-2 text-sm text-muted-foreground">Star</span>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-6 h-6" />
            <span className="mt-2 text-sm text-muted-foreground">MapPin</span>
          </div>
          <div className="flex flex-col items-center">
            <Check className="w-6 h-6" />
            <span className="mt-2 text-sm text-muted-foreground">Check</span>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Celebrity Choice
          </span>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-secondary/10 text-secondary">
            Award Winner
          </span>
          <span className="px-3 py-1 text-sm font-medium border rounded-full border-border/40">
            Default Badge
          </span>
        </div>
      </section>
    </div>
  );
};

export default StyleGuide;
