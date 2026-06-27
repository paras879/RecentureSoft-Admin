/**
 * @jest-environment node
 */
import { DELETE } from '@/app/api/admin/records/[type]/[id]/route';
import { NextRequest } from 'next/server';

// Mock mongoose
jest.mock('@/lib/mongodb', () => ({
    connectDB: jest.fn().mockResolvedValue(true),
}));

// Mock models
jest.mock('@/models/Blog', () => ({ findByIdAndDelete: jest.fn() }));
jest.mock('@/models/Project', () => ({ findByIdAndDelete: jest.fn() }));
jest.mock('@/models/Meeting', () => ({ findByIdAndDelete: jest.fn() }));
jest.mock('@/models/Contact', () => ({ findByIdAndDelete: jest.fn() }));
jest.mock('@/models/Portfolio', () => ({ findByIdAndDelete: jest.fn() }));
jest.mock('@/models/Service', () => ({ findByIdAndDelete: jest.fn() }));
jest.mock('@/models/Activity', () => ({ create: jest.fn() }));
jest.mock('@/lib/auth', () => ({
    verifyAuth: jest.fn().mockResolvedValue({ id: 'admin1', username: 'admin' }),
}));

describe('Admin Records Delete API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if unauthorized', async () => {
        // Override mock for this test
        const { verifyAuth } = require('@/lib/auth');
        verifyAuth.mockResolvedValueOnce(null);

        const req = new NextRequest('http://localhost:3000/api/admin/records/blog/123', { method: 'DELETE' });
        const res = await DELETE(req, { params: { type: 'blog', id: '123' } });
        
        expect(res.status).toBe(401);
    });

    it('should return 400 for invalid type', async () => {
        const req = new NextRequest('http://localhost:3000/api/admin/records/invalid/123', { method: 'DELETE' });
        const res = await DELETE(req, { params: { type: 'invalid', id: '123' } });
        
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toBe('Invalid record type');
    });

    it('should return 404 if record not found', async () => {
        const Blog = require('@/models/Blog');
        Blog.findByIdAndDelete.mockResolvedValueOnce(null);

        const req = new NextRequest('http://localhost:3000/api/admin/records/blog/123', { method: 'DELETE' });
        const res = await DELETE(req, { params: { type: 'blog', id: '123' } });
        
        expect(res.status).toBe(404);
    });

    it('should return 200 on successful delete', async () => {
        const Blog = require('@/models/Blog');
        Blog.findByIdAndDelete.mockResolvedValueOnce({ _id: '123', title: 'Test Blog' });

        const req = new NextRequest('http://localhost:3000/api/admin/records/blog/123', { method: 'DELETE' });
        const res = await DELETE(req, { params: { type: 'blog', id: '123' } });
        
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.message).toBe('Record deleted successfully');
    });
});
