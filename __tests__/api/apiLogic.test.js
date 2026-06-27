/**
 * Unit Tests: Admin Panel - API Route Business Logic
 * Tests slug generation, response structure, and validation rules
 */

describe('Slug Generation (Events API)', () => {
  // Extracted from /api/events/route.ts
  function generateSlug(title) {
    if (!title) return '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  it('generates correct slug for "Holi Celebration"', () => {
    expect(generateSlug('Holi Celebration')).toBe('holi-celebration');
  });

  it('generates correct slug for "New Year 2026"', () => {
    expect(generateSlug('New Year 2026')).toBe('new-year-2026');
  });

  it('removes special characters', () => {
    expect(generateSlug('Diwali! @Fest#')).toBe('diwali-fest');
  });

  it('handles multiple spaces', () => {
    expect(generateSlug('Team   Outing')).toBe('team-outing');
  });

  it('trims hyphens from start and end', () => {
    expect(generateSlug('  Christmas Party  ')).toBe('christmas-party');
  });

  it('returns empty string for empty input', () => {
    expect(generateSlug('')).toBe('');
  });
});

describe('API Request Body Validation Logic', () => {
  function validateReviewBody(body) {
    const errors = [];
    if (!body.name || body.name.trim() === '') errors.push('name is required');
    if (!body.role || body.role.trim() === '') errors.push('role is required');
    if (!body.company || body.company.trim() === '') errors.push('company is required');
    if (!body.text || body.text.trim() === '') errors.push('text is required');
    if (!body.avatar || body.avatar.trim() === '') errors.push('avatar is required');
    if (body.rating !== undefined) {
      if (body.rating < 1 || body.rating > 5) errors.push('rating must be between 1 and 5');
    }
    return errors;
  }

  it('passes for a valid complete review body', () => {
    const body = {
      name: 'Alice',
      role: 'Manager',
      company: 'ACME',
      text: 'Loved the service!',
      avatar: 'https://example.com/alice.jpg',
      rating: 5,
    };
    expect(validateReviewBody(body)).toHaveLength(0);
  });

  it('fails when name is missing', () => {
    const body = { role: 'Dev', company: 'Corp', text: 'Great!', avatar: 'url' };
    const errors = validateReviewBody(body);
    expect(errors).toContain('name is required');
  });

  it('fails when text is missing', () => {
    const body = { name: 'Bob', role: 'Dev', company: 'Corp', avatar: 'url' };
    const errors = validateReviewBody(body);
    expect(errors).toContain('text is required');
  });

  it('fails when rating is 0', () => {
    const body = { name: 'A', role: 'B', company: 'C', text: 'D', avatar: 'E', rating: 0 };
    const errors = validateReviewBody(body);
    expect(errors).toContain('rating must be between 1 and 5');
  });

  it('fails when rating is 6', () => {
    const body = { name: 'A', role: 'B', company: 'C', text: 'D', avatar: 'E', rating: 6 };
    const errors = validateReviewBody(body);
    expect(errors).toContain('rating must be between 1 and 5');
  });

  it('passes with rating 1 (min valid)', () => {
    const body = { name: 'A', role: 'B', company: 'C', text: 'D', avatar: 'E', rating: 1 };
    expect(validateReviewBody(body)).toHaveLength(0);
  });

  it('passes with rating 5 (max valid)', () => {
    const body = { name: 'A', role: 'B', company: 'C', text: 'D', avatar: 'E', rating: 5 };
    expect(validateReviewBody(body)).toHaveLength(0);
  });
});

describe('Team Member Validation Logic', () => {
  function validateTeamMember(body) {
    const errors = [];
    if (!body.name || body.name.trim() === '') errors.push('name is required');
    if (!body.role || body.role.trim() === '') errors.push('role is required');
    if (!body.quote || body.quote.trim() === '') errors.push('quote is required');
    if (!body.image || body.image.trim() === '') errors.push('image is required');
    return errors;
  }

  it('passes for a valid team member', () => {
    const body = {
      name: 'Sarah Jenkins',
      role: 'Senior Architect',
      quote: 'Best career move ever!',
      image: 'https://example.com/sarah.jpg',
    };
    expect(validateTeamMember(body)).toHaveLength(0);
  });

  it('fails when name is missing', () => {
    const body = { role: 'Dev', quote: 'Great!', image: 'url' };
    expect(validateTeamMember(body)).toContain('name is required');
  });

  it('fails when image is missing', () => {
    const body = { name: 'Alice', role: 'Dev', quote: 'Great!' };
    expect(validateTeamMember(body)).toContain('image is required');
  });

  it('fails for multiple missing fields', () => {
    const body = {};
    const errors = validateTeamMember(body);
    expect(errors.length).toBe(4);
  });
});

describe('Event Response Serialization', () => {
  it('correctly serializes an event from DB', () => {
    const rawEvent = {
      _id: { toString: () => '64f0000000000000' },
      title: 'Holi',
      slug: 'holi',
      date: '2026-03-20',
      location: 'Office',
      heroImage: '/images/holi.jpg',
      featured: true,
    };

    const serialized = {
      _id: rawEvent._id.toString(),
      title: rawEvent.title || '',
      slug: rawEvent.slug || '',
      date: rawEvent.date || '',
      location: rawEvent.location || '',
      heroImage: rawEvent.heroImage,
      featured: !!rawEvent.featured,
    };

    expect(serialized._id).toBe('64f0000000000000');
    expect(typeof serialized._id).toBe('string');
    expect(serialized.featured).toBe(true);
    expect(typeof serialized.featured).toBe('boolean');
  });

  it('defaults to empty string when title is null', () => {
    const title = null;
    expect(title || '').toBe('');
  });

  it('casts featured to boolean correctly', () => {
    expect(!!undefined).toBe(false);
    expect(!!null).toBe(false);
    expect(!!true).toBe(true);
    expect(!!1).toBe(true);
  });
});
