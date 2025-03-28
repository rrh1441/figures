
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { VerificationType } from "@/hooks/use-verification";
import { ArrowRight } from "lucide-react";

interface VerificationOption {
  type: VerificationType;
  label: string;
  description: string;
}

const verificationOptions: VerificationOption[] = [
  {
    type: "networth",
    label: "Net Worth",
    description: "Verify your assets and financial status"
  },
  {
    type: "height",
    label: "Height",
    description: "Confirm your actual height"
  },
  {
    type: "education",
    label: "Education",
    description: "Verify your degree and academic credentials"
  },
  {
    type: "career",
    label: "Job",
    description: "Verify your current employment and job title"
  },
  {
    type: "identity",
    label: "Background Investigation",
    description: "Comprehensive background check"
  }
];

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectVerifications: (types: VerificationType[]) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  open,
  onOpenChange,
  onSelectVerifications
}) => {
  const [selectedOptions, setSelectedOptions] = useState<VerificationType[]>([]);

  const toggleOption = (type: VerificationType) => {
    setSelectedOptions(prev => 
      prev.includes(type) 
        ? prev.filter(item => item !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = () => {
    onSelectVerifications(selectedOptions);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Verified</DialogTitle>
          <DialogDescription>
            Select the information you'd like to verify to enhance your profile's credibility.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {verificationOptions.map((option) => (
            <div 
              key={option.type}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => toggleOption(option.type)}
            >
              <Checkbox 
                id={option.type} 
                checked={selectedOptions.includes(option.type)}
                onCheckedChange={() => toggleOption(option.type)}
              />
              <div>
                <label 
                  htmlFor={option.type} 
                  className="font-medium cursor-pointer"
                >
                  {option.label}
                </label>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedOptions.length === 0}
            className="flex items-center gap-1"
          >
            Continue <ArrowRight size={16} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
