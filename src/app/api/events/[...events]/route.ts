import { NextResponse } from 'next/server';

// TODO: Implement actual event proxying logic, e.g., to Medusa or other services

export async function GET(
	request: Request,
	{ params }: { params: { events: string[] } },
) {
	// Removed console log for GET event
	return NextResponse.json({
		message: `Received GET for events: ${params.events.join('/')}`,
		params,
	});
}

export async function POST(
	request: Request,
	{ params }: { params: { events: string[] } },
) {
	// Removed console log for POST event
	const body = await request.json();
	return NextResponse.json({
		message: `Received POST for events: ${params.events.join('/')}`,
		params,
		body,
	});
}
