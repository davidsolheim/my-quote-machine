export async function GET() {
  try {
    const response = await fetch('https://api.quotable.io/random', {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 0 }, // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Failed to fetch quote:', error);
    return Response.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}


