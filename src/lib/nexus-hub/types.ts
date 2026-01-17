export type AccessLevel = 'Free' | 'Pro' | 'Enterprise' | 'Admin';
export type UserRole = 'Subscriber' | 'Creator';

export interface Gen {
    id: string;
    name: string;
    category: string;
    role: string;
    description: string;
    accessLevel: AccessLevel;
    status: 'active' | 'maintenance' | 'deprecated';
    capabilities: string[];
    systemInstruction?: string;
}

export interface TelemetryLog {
    timestamp: string;
    genId: string;
    action: string;
    status: 'success' | 'error' | 'warning';
    details?: any;
}

export interface GenUsageMetric {
    genId: string;
    genName: string;
    dailyActiveUsers: number;
    interactionsCount: number;
    avgResponseTimeMs: number;
    conversionRate?: number; // Specific for EcomMaster
}

export interface SupervisorInsight {
    type: 'cross-sell' | 'performance' | 'alert';
    message: string;
    suggestedGenId?: string; // ID of the Gen being recommended
    priority: 'low' | 'medium' | 'high';
}

// Data Model for the NexusHub (Central Brain)
export interface NexusHubState {
    version: string;
    connectedGens: number;
    systemHealth: string;
    lastSync: string;
}
