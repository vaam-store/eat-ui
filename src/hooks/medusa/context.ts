'use client';

import type Medusa from '@medusajs/js-sdk';
import { createContext } from 'react';

export const medusaContext = createContext<Medusa | undefined>(undefined);
