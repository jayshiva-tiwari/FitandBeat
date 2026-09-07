export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    picture?: string;
    isOnboardingComplete: boolean;
  };
}

export const authWithGoogle = async (credential: string): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ credential }),
    credentials: 'same-origin',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Authentication failed');
  }

  return response.json();
};

export const fetchCurrentUser = async () => {
  const response = await fetch('/api/auth/me', {
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};

export const markOnboardingComplete = async () => {
  const response = await fetch('/api/auth/onboarding', {
    method: 'PUT',
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new Error('Failed to update onboarding status');
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'same-origin',
  });
  
  if (!response.ok) throw new Error('Logout failed');
  return response.json();
};

