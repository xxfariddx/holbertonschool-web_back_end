#!/usr/bin/env python3
"""Module for measuring parallel async runtime."""

import asyncio
import time

# Import async_comprehension from the previous file
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Execute async_comprehension four times in parallel using asyncio.gather

    and return the total execution runtime.
    """
    start_time = time.perf_counter()

    # Fire off all 4 tasks concurrently using asyncio.gather
    await asyncio.gather(*(async_comprehension() for _ in range(4)))

    end_time = time.perf_counter()
    return end_time - start_time
