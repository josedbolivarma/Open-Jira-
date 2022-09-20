interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending Loren ipsum I dont know',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'In progress Loren ipsum I dont know',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Finished Loren ipsum I dont know',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },  
    ]
}