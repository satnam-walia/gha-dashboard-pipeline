import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { encryptToken, decryptToken } from '../utils/secureToken';

let useStore; // déclaration anticipée

useStore = create(
    persist(
        (set) => ({
            token: null,
            repo: null,
            setToken: (token) => set({ token }),
            setRepoName: (repo) => set({ repo }),
        }),
        {
            name: 'token-session',
            storage: {
                getItem: (key) => {
                    const encrypted = sessionStorage.getItem(key);
                    if (!encrypted) return null;
                    const decrypted = decryptToken(encrypted);
                    return decrypted ? JSON.stringify(decrypted) : null;
                },
                setItem: (key, value) => {
                    const encrypted = encryptToken(value);
                    sessionStorage.setItem(key, encrypted);
                },
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);

export { useStore };
