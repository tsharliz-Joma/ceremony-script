"use client";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Button from "@/components/ui/Button";

export default function Ceremony() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    groomFirstName: "",
    groomSurname: "",
    brideFirstName: "",
    brideSurname: "",
    date: "",
    venue: "",
    witnessOne: "",
    witnessTwo: "",
    howTheyMet: "",
    specialMoments: "",
    sharedValues: "",
    funFact: "",
    vowsGroom: "",
    vowsBride: "",
    tone: "",
    includeHumor: "",
    spiritualElements: "",
    culturalTraditions: "",
    specialRequests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, date: format(date, "yyyy-MM-dd") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.ceremony-script.tsharliz.com/generate-doc",
        formData,
        { responseType: "blob" } // Ensures we receive the document as a file
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      const groomName = formData.groomFirstName || "Groom";
      const brideName = formData.brideFirstName || "Bride";
      const fileName = `Ceremony_Script_${brideName}_and_${groomName}.docx`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF7F2] p-6">
      <h1 className="text-4xl font-bold text-[#8E7754] mb-6">Generate Your Ceremony Script</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
        onSubmit={handleSubmit}
      >
        {/* Step 1: Basic Details */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-[#8E7754]">Bride & Groom Information</h2>
            <input
              className="border p-3 w-full rounded-md"
              name="groomFirstName"
              placeholder="Groom's First Name"
              onChange={handleChange}
              required
            />
            <input
              className="border p-3 w-full rounded-md"
              name="groomSurname"
              placeholder="Groom's Last Name"
              onChange={handleChange}
              required
            />
            <input
              className="border p-3 w-full rounded-md"
              name="brideFirstName"
              placeholder="Bride's First Name"
              onChange={handleChange}
              required
            />
            <input
              className="border p-3 w-full rounded-md"
              name="brideSurname"
              placeholder="Bride's Last Name"
              onChange={handleChange}
              required
            />

            <h2 className="text-2xl font-bold text-[#8E7754]">Wedding Details</h2>
            <div className="border p-3 w-full rounded-md flex flex-col items-center justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                modifiers={{ disabled: { before: new Date() } }}
              />
              {selectedDate && (
                <p className="text-sm mt-2">Selected Date: {format(selectedDate, "yyyy-MM-dd")}</p>
              )}
            </div>
            <input
              className="border p-3 w-full rounded-md"
              name="venue"
              placeholder="Venue"
              onChange={handleChange}
              required
            />
            <input
              className="border p-3 w-full rounded-md"
              name="witnessOne"
              placeholder="Witness 1"
              onChange={handleChange}
              required
            />
            <input
              className="border p-3 w-full rounded-md"
              name="witnessTwo"
              placeholder="Witness 2"
              onChange={handleChange}
              required
            />

            <Button type="button" className="w-full mt-4" onClick={() => setStep(2)}>
              Next
            </Button>
          </>
        )}

        {/* Step 2: Personalization */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-[#8E7754]">Personalize Your Ceremony</h2>
            <textarea
              className="border p-3 w-full rounded-md"
              name="howTheyMet"
              placeholder="How did the couple meet?"
              onChange={handleChange}
            ></textarea>
            <textarea
              className="border p-3 w-full rounded-md"
              name="specialMoments"
              placeholder="Special moments they've shared?"
              onChange={handleChange}
            ></textarea>
            <textarea
              className="border p-3 w-full rounded-md"
              name="sharedValues"
              placeholder="What values are important to them as a couple?"
              onChange={handleChange}
            ></textarea>
            <textarea
              className="border p-3 w-full rounded-md"
              name="funFact"
              placeholder="Fun fact about their relationship?"
              onChange={handleChange}
            ></textarea>
            <textarea
              className="border p-3 w-full rounded-md"
              name="vowsGroom"
              placeholder="Groom's Personal Vows"
              onChange={handleChange}
            ></textarea>
            <textarea
              className="border p-3 w-full rounded-md"
              name="vowsBride"
              placeholder="Bride's Personal Vows"
              onChange={handleChange}
            ></textarea>

            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" onClick={() => setStep(3)}>
                Next
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-[#8E7754]">Final Touches</h2>

            <label className="block font-medium">Preferred Tone</label>
            <select name="tone" className="border p-3 w-full rounded-md" onChange={handleChange}>
              <option value="">Select a tone</option>
              <option value="Formal">Formal</option>
              <option value="Lighthearted">Lighthearted</option>
              <option value="Funny">Funny</option>
              <option value="Romantic">Romantic</option>
            </select>

            <label className="block font-medium mt-4">Include Humor?</label>
            <select
              name="includeHumor"
              className="border p-3 w-full rounded-md"
              onChange={handleChange}
            >
              <option value="">Select one</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <textarea
              className="border p-3 w-full rounded-md mt-4"
              name="spiritualElements"
              placeholder="Any spiritual or religious elements to include?"
              onChange={handleChange}
            ></textarea>

            <textarea
              className="border p-3 w-full rounded-md"
              name="culturalTraditions"
              placeholder="Cultural traditions to mention?"
              onChange={handleChange}
            ></textarea>

            <textarea
              className="border p-3 w-full rounded-md"
              name="specialRequests"
              placeholder="Anything else you want to include?"
              onChange={handleChange}
            ></textarea>

            <div className="flex justify-between">
              <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit" isLoading={loading}>
                Generate Script
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
