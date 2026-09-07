import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, CheckCircle2, Activity } from 'lucide-react';
import { cn } from '../utils/cn';
import { markOnboardingComplete } from '../services/api';
import { useAuth } from '../context/AuthContext';

const STEPS = [
  {
    title: 'What is your main fitness goal?',
    options: ['Improve fitness', 'Become more active', 'Lose weight', 'Build strength', 'Improve endurance', 'Improve flexibility', 'Participate in sports', 'Build healthy habits']
  },
  {
    title: 'What is your fitness level?',
    options: ['Beginner', 'Intermediate', 'Advanced']
  },
  {
    title: 'How much time can you spend each day?',
    options: ['10 minutes', '20 minutes', '30 minutes', '45 minutes', '60+ minutes']
  },
  {
    title: 'Which activities do you enjoy?',
    options: ['Walking', 'Running', 'Cycling', 'Yoga', 'Strength training', 'Stretching', 'Home workouts', 'Sports'],
    multiple: true
  },
  {
    title: 'Which sports interest you?',
    options: ['Badminton', 'Cricket', 'Football', 'Basketball', 'Volleyball', 'Tennis', 'Table Tennis', 'Swimming', 'Cycling', 'Athletics'],
    multiple: true
  },
  {
    title: 'Where do you prefer to exercise?',
    options: ['Indoor', 'Outdoor', 'Both']
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSelect = (option: string) => {
    const isMultiple = STEPS[step].multiple;
    if (isMultiple) {
      const current = (selections[step] as string[]) || [];
      if (current.includes(option)) {
        setSelections({ ...selections, [step]: current.filter(item => item !== option) });
      } else {
        setSelections({ ...selections, [step]: [...current, option] });
      }
    } else {
      setSelections({ ...selections, [step]: option });
    }
  };

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
      
      try {
        const updatedUser = await markOnboardingComplete();
        updateUser(updatedUser);
      } catch (err) {
        console.error("Failed to complete onboarding on server", err);
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-indigo-600 flex flex-col items-center justify-center text-white p-6">
        <div className="bg-white/10 p-6 rounded-full mb-8">
          <CheckCircle2 className="w-20 h-20 text-indigo-200" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">Your FitandBeat plan is ready!</h1>
        <p className="text-indigo-200 text-lg text-center max-w-md">
          We've personalized your fitness journey based on your profile. Get ready to move more and play more.
        </p>
      </div>
    );
  }

  const currentStep = STEPS[step];
  const isMultiple = currentStep.multiple;
  const currentSelection = selections[step];
  const isValid = isMultiple ? (currentSelection as string[])?.length > 0 : !!currentSelection;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-12 md:pt-24 px-6 pb-20">
      <div className="w-full max-w-xl">
        <header className="flex justify-between items-center mb-12">
           {step > 0 ? (
             <button onClick={handleBack} className="p-2 hover:bg-slate-200 rounded-full transition text-slate-600">
               <ArrowLeft className="w-6 h-6" />
             </button>
           ) : (
             <div className="w-10"></div>
           )}
           <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
             <Activity className="w-5 h-5" /> FitandBeat
           </div>
           <div className="w-10 text-right text-sm font-medium text-slate-400">
             {step + 1}/{STEPS.length}
           </div>
        </header>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">{currentStep.title}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {currentStep.options.map((option) => {
              const isSelected = isMultiple 
                ? ((currentSelection as string[]) || []).includes(option)
                : currentSelection === option;
                
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "p-4 rounded-2xl text-left font-medium transition-all duration-200 border-2",
                    isSelected 
                      ? "bg-indigo-50 border-indigo-600 text-indigo-700" 
                      : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                  )}
                >
                  {option}
                </button>
              )
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={!isValid}
            className="w-full bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition hover:bg-indigo-700"
          >
            {step === STEPS.length - 1 ? 'Finish' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
