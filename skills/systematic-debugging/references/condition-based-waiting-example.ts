// Condition-based waiting utilities.
// From a real test-infrastructure session that fixed 15 flaky tests by
// replacing arbitrary sleeps with condition polling.

import type { ThreadManager } from '~/threads/thread-manager';
import type { LaceEvent, LaceEventType } from '~/threads/types';

export function waitForEvent(
  threadManager: ThreadManager,
  threadId: string,
  eventType: LaceEventType,
  timeoutMs = 5000
): Promise<LaceEvent> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const events = threadManager.getEvents(threadId);
      const event = events.find((e) => e.type === eventType);

      if (event) {
        resolve(event);
      } else if (Date.now() - startTime > timeoutMs) {
        reject(new Error(`Timeout waiting for ${eventType} event after ${timeoutMs}ms`));
      } else {
        setTimeout(check, 10); // poll every 10ms
      }
    };

    check();
  });
}

export function waitForEventCount(
  threadManager: ThreadManager,
  threadId: string,
  eventType: LaceEventType,
  count: number,
  timeoutMs = 5000
): Promise<LaceEvent[]> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const events = threadManager.getEvents(threadId);
      const matchingEvents = events.filter((e) => e.type === eventType);

      if (matchingEvents.length >= count) {
        resolve(matchingEvents);
      } else if (Date.now() - startTime > timeoutMs) {
        reject(
          new Error(
            `Timeout waiting for ${count} ${eventType} events after ${timeoutMs}ms (got ${matchingEvents.length})`
          )
        );
      } else {
        setTimeout(check, 10);
      }
    };

    check();
  });
}

export function waitForEventMatch(
  threadManager: ThreadManager,
  threadId: string,
  predicate: (event: LaceEvent) => boolean,
  description: string,
  timeoutMs = 5000
): Promise<LaceEvent> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      const events = threadManager.getEvents(threadId);
      const event = events.find(predicate);

      if (event) {
        resolve(event);
      } else if (Date.now() - startTime > timeoutMs) {
        reject(new Error(`Timeout waiting for ${description} after ${timeoutMs}ms`));
      } else {
        setTimeout(check, 10);
      }
    };

    check();
  });
}

// Usage from the actual session:
//
// BEFORE (flaky)
//   const messagePromise = agent.sendMessage('Execute tools');
//   await new Promise(r => setTimeout(r, 300)); // hope tools start in 300ms
//   agent.abort();
//   await messagePromise;
//   await new Promise(r => setTimeout(r, 50));  // hope results arrive in 50ms
//   expect(toolResults.length).toBe(2);         // fails randomly
//
// AFTER (reliable)
//   const messagePromise = agent.sendMessage('Execute tools');
//   await waitForEventCount(threadManager, threadId, 'TOOL_CALL', 2);
//   agent.abort();
//   await messagePromise;
//   await waitForEventCount(threadManager, threadId, 'TOOL_RESULT', 2);
//   expect(toolResults.length).toBe(2);
//
// Result: 60% pass rate became 100%, 40% faster execution.
