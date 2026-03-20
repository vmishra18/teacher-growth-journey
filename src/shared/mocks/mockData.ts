import type { JourneyState } from '@/shared/types';

export const initialJourneyState: JourneyState = {
  currentFocusAreaId: 'questioning',
  focusAreas: [
    {
      id: 'questioning',
      name: 'Questioning',
      strapline: 'Developing effective questioning to deepen pupil thinking and engagement.',
      description:
        'Improve the quality and depth of questions to enhance pupil thinking.',
      evidenceSummary:
        'Research on classroom questioning suggests that carefully sequenced questions, with enough thinking time, can improve participation, check understanding, and deepen pupil thinking.',
      whyItMatters:
        'Effective questioning helps pupils think hard, makes understanding more visible, and keeps more of the class engaged in the learning.',
      currentGoal:
        'Use questioning routines more consistently across lessons so more pupils explain and justify their thinking.',
      progressNotes:
        'You have started to use more deliberate questioning in everyday teaching and are noticing fuller pupil responses.',
      baselineProgress: 60,
      colorToken: 'blue',
      techniques: [
        {
          id: 'open-ended-questions',
          title: 'Use open-ended questions',
          summary:
            'Ask questions that require explanation, justification, or comparison rather than simple recall.',
          steps: [
            'Ask “why” and “how” questions',
            'Encourage multiple answers',
            'Prompt pupils to explain their reasoning',
          ],
          classroomExample: '“Why do you think this method works, and what evidence from the example supports your answer?”',
          tried: true,
          bookmarked: false,
          lastTriedAt: '2026-03-18T10:20:00.000Z',
        },
        {
          id: 'increase-wait-time',
          title: 'Increase wait time',
          summary: 'Give pupils time to think before answering so more can formulate a response.',
          steps: [
            'Pause for 3–5 seconds after asking',
            'Avoid answering your own question',
            'Encourage thoughtful responses',
          ],
          classroomExample:
            'After asking, hold the pause for a full few seconds before taking an answer so more pupils stay with the question.',
          tried: false,
          bookmarked: false,
        },
        {
          id: 'no-hands-up',
          title: 'No hands up',
          summary:
            'Invite participation more deliberately instead of relying on volunteers.',
          steps: [
            'Let everyone think before inviting a response',
            'Choose pupils rather than waiting for volunteers',
            'Follow up by asking pupils to explain their reasoning',
          ],
          classroomExample:
            'After posing a question, give everyone thinking time and then select a pupil rather than taking the first volunteer.',
          tried: false,
          bookmarked: true,
        },
      ],
      resources: [
        {
          id: 'resource-questioning-1',
          title: 'Improving classroom questioning strategies',
          description:
            'A practical guide to planning sequences of questions that improve participation, challenge, and depth of response.',
          type: 'article',
          duration: '5 min read',
          url: 'https://example.com/improving-classroom-questioning-strategies',
        },
        {
          id: 'resource-questioning-2',
          title: 'Encouraging deeper pupil thinking',
          description:
            'Examples of teacher prompts that encourage pupils to elaborate, compare, and justify their ideas.',
          type: 'article',
          duration: '4 min read',
          url: 'https://example.com/encouraging-deeper-student-thinking',
        },
      ],
    },
    {
      id: 'feedback',
      name: 'Feedback',
      strapline: 'Provide actionable, timely feedback that supports learning.',
      description:
        'Provide actionable, timely feedback that supports learning.',
      evidenceSummary:
        'Feedback is more likely to improve learning when it is specific, manageable, and followed by time for pupils to act on it.',
      whyItMatters:
        'Clear feedback helps pupils understand what quality looks like and improves the chances that they will improve their next piece of work.',
      currentGoal:
        'Make feedback more actionable by reducing overload and giving pupils time to respond in lesson.',
      progressNotes:
        'You have started to tighten your feedback routine, but the response phase is not yet consistent across classes.',
      baselineProgress: 20,
      colorToken: 'green',
      techniques: [
        {
          id: 'actionable-feedback',
          title: 'Make feedback actionable',
          summary:
            'Give one clear next step that pupils can apply immediately.',
          steps: [
            'Identify the most important improvement point',
            'Phrase feedback as a concrete action',
            'Give lesson time for pupils to respond',
          ],
          classroomExample:
            'Instead of several comments, ask pupils to redraft one paragraph using a shared success criterion.',
          tried: false,
          bookmarked: false,
        },
      ],
      resources: [
        {
          id: 'resource-feedback-1',
          title: 'Making feedback useful in lesson time',
          description:
            'A short guide to feedback routines that lead to pupil action rather than comment overload.',
          type: 'article',
          duration: '6 min read',
          url: 'https://example.com/making-feedback-useful',
        },
      ],
    },
    {
      id: 'classroom-routines',
      name: 'Classroom Routines',
      strapline: 'Establish clear routines to maximise learning time.',
      description: 'Establish clear routines to maximise learning time.',
      evidenceSummary:
        'Clear routines reduce transition time, protect attention, and create more time for learning in every lesson.',
      whyItMatters:
        'Predictable routines help pupils know what to do quickly and free teacher attention for instruction rather than repeated reminders.',
      currentGoal:
        'Make the first few minutes of lessons calmer and more automatic.',
      progressNotes:
        'You have some routines in place, but the start of lessons is not yet consistently calm and purposeful.',
      baselineProgress: 40,
      colorToken: 'teal',
      techniques: [
        {
          id: 'entry-routines',
          title: 'Tighten entry routines',
          summary:
            'Use the same first-minute routine so pupils know how to begin without repeated prompting.',
          steps: [
            'Clarify the first actions pupils take',
            'Practise the routine explicitly',
            'Reinforce it consistently',
          ],
          classroomExample:
            'Pupils enter, take out equipment, and begin a short retrieval task without waiting for further instruction.',
          tried: false,
          bookmarked: false,
        },
      ],
      resources: [
        {
          id: 'resource-routines-1',
          title: 'Building routines that stick',
          description:
            'Simple approaches to establishing and rehearsing routines without increasing teacher talk.',
          type: 'video',
          duration: '5 min video',
          url: 'https://example.com/building-routines-that-stick',
        },
      ],
    },
    {
      id: 'supportive-environment',
      name: 'Supportive Environment',
      strapline: 'Build a classroom culture that supports engagement and confidence.',
      description:
        'Build a classroom culture that supports engagement and confidence.',
      evidenceSummary:
        'Supportive classrooms improve participation, belonging, and pupils’ willingness to contribute to demanding learning.',
      whyItMatters:
        'Pupils are more likely to contribute and persist when they feel safe, included, and respected in the classroom.',
      currentGoal:
        'Increase participation from quieter pupils during whole-class discussion.',
      progressNotes:
        'You are creating a warm classroom tone, but structured participation from quieter pupils is still developing.',
      baselineProgress: 10,
      colorToken: 'amber',
      techniques: [
        {
          id: 'participation-structure',
          title: 'Structure participation',
          summary:
            'Use brief paired thinking and planned prompts so more pupils are ready to contribute.',
          steps: [
            'Give short thinking time',
            'Use talk stems to support responses',
            'Invite a wider range of pupils into discussion',
          ],
          classroomExample:
            'Pupils rehearse an idea with a partner before sharing an answer in whole-class discussion.',
          tried: false,
          bookmarked: false,
        },
      ],
      resources: [
        {
          id: 'resource-supportive-1',
          title: 'Encouraging confident classroom participation',
          description:
            'A practical resource on building academic confidence through classroom routines and teacher language.',
          type: 'article',
          duration: '5 min read',
          url: 'https://example.com/encouraging-confident-participation',
        },
      ],
    },
  ],
  reflections: [
    {
      id: 'reflection-1',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      techniqueId: 'open-ended-questions',
      confidence: 4,
      wentWell:
        'Pupils gave fuller answers when I used open questions, and several were able to justify their thinking with examples from the text.',
      improveNext:
        'Next lesson I want to hold the pause for longer and invite a wider range of pupils to explain how they reached their answer.',
      createdAt: '2026-03-19T15:15:00.000Z',
    },
    {
      id: 'reflection-2',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      techniqueId: 'increase-wait-time',
      confidence: 3,
      wentWell: 'More pupils offered thoughtful responses once I stopped rephrasing the question too quickly.',
      improveNext:
        'I need to keep the same wait time during the whole lesson, not only when I have planned the question in advance.',
      createdAt: '2026-03-17T14:05:00.000Z',
    },
  ],
  evidenceSignals: [
    {
      id: 'evidence-1',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      sourceType: 'student-survey',
      title: 'Pupils say they need longer thinking time before answering',
      summary:
        'Recent pupil survey feedback suggests more wait time would help more of the class contribute confidently during whole-class questioning.',
      insightTitle: 'Increase wait time more consistently',
      insightDescription:
        'Pupil feedback suggests that holding the pause for longer would improve participation and confidence during questioning.',
      createdAt: '2026-03-20T07:45:00.000Z',
      status: 'new',
    },
    {
      id: 'evidence-2',
      focusAreaId: 'feedback',
      focusAreaName: 'Feedback',
      sourceType: 'mentor-observation',
      title: 'Observation note highlights that pupils act when feedback is narrowed',
      summary:
        'A recent lesson observation noted that pupils responded more successfully when feedback was reduced to one clear next step and time to improve was protected.',
      insightTitle: 'Tighten feedback into one clear next step',
      insightDescription:
        'Observation feedback suggests pupils are more likely to improve their work when the next action is precise and there is lesson time to act on it.',
      createdAt: '2026-03-18T15:35:00.000Z',
      status: 'new',
    },
  ],
  insights: [
    {
      id: 'insight-1',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      reflectionId: 'reflection-1',
      sourceType: 'reflection',
      title: 'Increase wait time more consistently',
      description:
        'Pupils engaged well with open questions, but wait time still needs to be more deliberate after asking.',
      createdAt: '2026-03-19T15:18:00.000Z',
      status: 'goal',
    },
    {
      id: 'insight-2',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      reflectionId: 'reflection-2',
      sourceType: 'reflection',
      title: 'Hold the pause across the whole lesson',
      description:
        'Wait time improved the quality of pupil responses, but it needs to happen consistently and not only in planned moments.',
      createdAt: '2026-03-17T14:10:00.000Z',
      status: 'new',
    },
  ],
  goals: [
    {
      id: 'goal-1',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      insightId: 'insight-1',
      title: 'Increase wait time more consistently',
      description:
        'Pause for 3–5 seconds after asking questions so more pupils can think before responding.',
      createdAt: '2026-03-19T15:22:00.000Z',
      status: 'active',
    },
  ],
  activeGoalId: 'goal-1',
};
