import { Auth } from '@auth/core';
import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../../consts';

export const authConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        if (credentials.email === ADMIN_EMAIL) {
          const passwordMatch = await bcrypt.compare(credentials.password, ADMIN_PASSWORD);
          
          if (passwordMatch) {
            return {
              id: "1",
              email: ADMIN_EMAIL,
              name: "Admin"
            };
          }
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  }
};

export const { get, post } = defineConfig(authConfig);