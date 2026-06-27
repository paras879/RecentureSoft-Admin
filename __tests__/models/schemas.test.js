/**
 * Unit Tests: Admin Panel - Schema Validation
 * Tests for all Admin models schema fields, required constraints, and defaults
 */

jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn(),
  };
});

describe('Review Model Schema (Admin)', () => {
  let Review;

  beforeAll(async () => {
    const mod = await import('@/models/Review');
    Review = mod.default;
  });

  it('has all required fields', () => {
    const paths = Object.keys(Review.schema.paths);
    expect(paths).toContain('name');
    expect(paths).toContain('role');
    expect(paths).toContain('company');
    expect(paths).toContain('rating');
    expect(paths).toContain('avatar');
    expect(paths).toContain('text');
  });

  it('rating default is 5', () => {
    expect(Review.schema.path('rating').options.default).toBe(5);
  });

  it('rating min is 1', () => {
    expect(Review.schema.path('rating').options.min).toBe(1);
  });

  it('rating max is 5', () => {
    expect(Review.schema.path('rating').options.max).toBe(5);
  });

  it('has timestamps', () => {
    expect(Review.schema.options.timestamps).toBe(true);
  });
});

describe('TeamMember Model Schema (Admin)', () => {
  let TeamMember;

  beforeAll(async () => {
    const mod = await import('@/models/TeamMember');
    TeamMember = mod.default;
  });

  it('has name, role, quote, image fields', () => {
    const paths = Object.keys(TeamMember.schema.paths);
    expect(paths).toContain('name');
    expect(paths).toContain('role');
    expect(paths).toContain('quote');
    expect(paths).toContain('image');
  });

  it('all fields are required', () => {
    expect(TeamMember.schema.path('name').isRequired).toBe(true);
    expect(TeamMember.schema.path('role').isRequired).toBe(true);
    expect(TeamMember.schema.path('quote').isRequired).toBe(true);
    expect(TeamMember.schema.path('image').isRequired).toBe(true);
  });
});

describe('Event Model Schema (Admin)', () => {
  let Event;

  beforeAll(async () => {
    const mod = await import('@/models/Event');
    Event = mod.default;
  });

  it('has all expected fields', () => {
    const paths = Object.keys(Event.schema.paths);
    expect(paths).toContain('title');
    expect(paths).toContain('slug');
    expect(paths).toContain('date');
    expect(paths).toContain('location');
    expect(paths).toContain('heroImage');
    expect(paths).toContain('featured');
  });

  it('featured is a Boolean', () => {
    expect(Event.schema.path('featured').instance).toBe('Boolean');
  });
});

describe('EventGallery Model Schema (Admin)', () => {
  let EventGallery;

  beforeAll(async () => {
    const mod = await import('@/models/EventGallery');
    EventGallery = mod.default;
  });

  it('has eventSlug, year, imageUrl', () => {
    const paths = Object.keys(EventGallery.schema.paths);
    expect(paths).toContain('eventSlug');
    expect(paths).toContain('year');
    expect(paths).toContain('imageUrl');
  });
});

describe('Admin Model Schema', () => {
  let Admin;

  beforeAll(async () => {
    const mod = await import('@/models/Admin');
    Admin = mod.default;
  });

  it('has username and password fields', () => {
    const paths = Object.keys(Admin.schema.paths);
    expect(paths).toContain('username');
    expect(paths).toContain('password');
  });
});
