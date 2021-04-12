import { query } from '../db';

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (req, h) => {
        const listings = await query('SELECT * FROM listings', []);
        return listings;
    }
}