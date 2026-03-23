import type { JourneyState } from '@/shared/types';

export const initialJourneyState: JourneyState = {
  currentFocusAreaId: 'questioning',
  focusAreas: [
    {
      id: 'questioning',
      name: 'Questioning',
      strapline: 'Developing effective questioning to deepen pupil thinking and engagement.',
      description: 'Improve the quality and depth of questions to enhance student thinking.',
      evidenceSummary:
        'Research on questioning suggests pupils contribute more, explain more clearly, and think more deeply when questions are sequenced carefully and enough thinking time is protected.',
      whyItMatters:
        'Effective questioning keeps more of the class thinking, makes understanding visible, and improves the quality of pupil talk.',
      currentGoal:
        'Use questioning routines more consistently across lessons so more pupils explain and justify their thinking.',
      progressNotes:
        'You are using more deliberate questioning in everyday teaching, and pupils are beginning to offer fuller responses without as much prompting.',
      baselineProgress: 60,
      colorToken: 'blue',
      techniques: [
        {
          id: 'increase-wait-time',
          title: 'Increase wait time',
          summary: 'Give pupils time to think before answering so more can formulate a response.',
          steps: [
            'Pause for 3–5 seconds after asking',
            'Avoid answering your own question too quickly',
            'Normalize silence as thinking time',
          ],
          classroomExample:
            'After asking, hold the pause for a full few seconds before taking an answer so more pupils stay with the question.',
          tried: false,
          bookmarked: true,
        },
        {
          id: 'open-ended-questions',
          title: 'Use open-ended questions',
          summary:
            'Ask questions that require explanation, justification, or comparison rather than simple recall.',
          steps: [
            'Ask “why” and “how” questions',
            'Press for explanation with a follow-up prompt',
            'Invite pupils to justify their reasoning with evidence',
          ],
          classroomExample:
            '“Why do you think this method works, and what in the example helps you prove it?”',
          tried: true,
          bookmarked: false,
          lastTriedAt: '2026-03-18T10:20:00.000Z',
        },
        {
          id: 'no-hands-up',
          title: 'No hands up',
          summary: 'Invite participation more deliberately instead of relying on volunteers.',
          steps: [
            'Give everyone thinking time before choosing',
            'Select a pupil rather than taking the first volunteer',
            'Follow up by asking another pupil to build or challenge the answer',
          ],
          classroomExample:
            'After posing a question, give everyone thinking time and then select a pupil rather than taking the first volunteer.',
          tried: false,
          bookmarked: true,
        },
        {
          id: 'hinge-questions',
          title: 'Plan hinge questions',
          summary:
            'Use one well-timed question to check understanding before deciding whether to move on.',
          steps: [
            'Choose the precise misconception to test',
            'Write short options that reveal likely misunderstandings',
            'Use the answer pattern to decide the next teaching move',
          ],
          classroomExample:
            'Midway through practice, ask one multiple-choice question that reveals whether pupils are confusing method and answer.',
          tried: false,
          bookmarked: false,
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
            'Examples of prompts that help pupils elaborate, compare, and justify their ideas more clearly.',
          type: 'article',
          duration: '4 min read',
          url: 'https://example.com/encouraging-deeper-student-thinking',
        },
        {
          id: 'resource-questioning-3',
          title: 'Using hinge questions in lesson',
          description:
            'Short examples of hinge questions that help teachers decide whether to reteach, model again, or move on.',
          type: 'video',
          duration: '6 min video',
          url: 'https://example.com/using-hinge-questions-in-lesson',
        },
      ],
    },
    {
      id: 'feedback',
      name: 'Feedback',
      strapline: 'Provide actionable, timely feedback that supports learning.',
      description: 'Provide actionable, timely feedback that supports learning.',
      evidenceSummary:
        'Feedback is more likely to improve learning when it is precise, manageable, and followed by protected time for pupils to act on it.',
      whyItMatters:
        'Clear feedback helps pupils understand what quality looks like and improves the chance that their next piece of work will be stronger.',
      currentGoal:
        'Make feedback more actionable by reducing overload and giving pupils time to respond in lesson.',
      progressNotes:
        'You have started to tighten your feedback routine, but pupils do not yet get response time consistently across classes.',
      baselineProgress: 34,
      colorToken: 'green',
      techniques: [
        {
          id: 'actionable-feedback',
          title: 'Make feedback actionable',
          summary: 'Give one clear next step that pupils can apply immediately.',
          steps: [
            'Identify the most important improvement point',
            'Phrase feedback as one concrete action',
            'Build in time for pupils to improve their work straight away',
          ],
          classroomExample:
            'Instead of several comments, ask pupils to redraft one paragraph using a shared success criterion.',
          tried: true,
          bookmarked: false,
          lastTriedAt: '2026-03-12T13:10:00.000Z',
        },
        {
          id: 'whole-class-feedback',
          title: 'Use whole-class feedback',
          summary:
            'Address patterns in the class’s work together so pupils respond to the most important improvement points.',
          steps: [
            'Collect the most common strengths and errors',
            'Model one example of improvement',
            'Give pupils structured response time before moving on',
          ],
          classroomExample:
            'Share a short class feedback slide with two common errors, then ask pupils to correct one example in their books.',
          tried: false,
          bookmarked: true,
        },
        {
          id: 'feedback-response-routine',
          title: 'Protect feedback response time',
          summary:
            'Build a short, predictable routine so pupils always act on feedback rather than simply reading it.',
          steps: [
            'Reserve a fixed window for response',
            'Set one visible improvement task',
            'Check that pupils complete the revision before the lesson moves on',
          ],
          classroomExample:
            'Start the lesson with a five-minute improvement task linked directly to the most recent feedback.',
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
        {
          id: 'resource-feedback-2',
          title: 'Whole-class feedback examples',
          description:
            'Worked examples of feedback slides and response routines that keep workload manageable.',
          type: 'video',
          duration: '7 min video',
          url: 'https://example.com/whole-class-feedback-examples',
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
      currentGoal: 'Make the first few minutes of lessons calmer and more automatic.',
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
            'Reinforce it consistently every lesson',
          ],
          classroomExample:
            'Pupils enter, take out equipment, and begin a short retrieval task without waiting for further instruction.',
          tried: true,
          bookmarked: false,
          lastTriedAt: '2026-03-16T08:25:00.000Z',
        },
        {
          id: 'do-now-start',
          title: 'Start with a do-now task',
          summary:
            'Use one short independent task so pupils settle quickly and instruction begins with everyone already working.',
          steps: [
            'Prepare one short task pupils can begin immediately',
            'Keep the routine visible in the same place each lesson',
            'Review the task once the class is fully settled',
          ],
          classroomExample:
            'Display a retrieval question before pupils enter so they begin writing as soon as they sit down.',
          tried: true,
          bookmarked: true,
          lastTriedAt: '2026-03-06T08:30:00.000Z',
        },
        {
          id: 'reset-routine',
          title: 'Teach a silent reset routine',
          summary:
            'Use one brief reset routine so transitions back to whole-class attention are quicker and less noisy.',
          steps: [
            'Choose one clear attention cue',
            'Teach what pupils do during the reset',
            'Practise it until the transition becomes automatic',
          ],
          classroomExample:
            'At the cue, pupils stop, face forward, and track the speaker within a few seconds.',
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
        {
          id: 'resource-routines-2',
          title: 'Improving lesson starts',
          description:
            'Examples of entry tasks and first-minute routines that reduce drift at the start of lessons.',
          type: 'article',
          duration: '4 min read',
          url: 'https://example.com/improving-lesson-starts',
        },
      ],
    },
    {
      id: 'supportive-environment',
      name: 'Supportive Environment',
      strapline: 'Build a classroom culture that supports engagement and confidence.',
      description: 'Build a classroom culture that supports engagement and confidence.',
      evidenceSummary:
        'Supportive classrooms improve participation, belonging, and pupils’ willingness to contribute to demanding learning.',
      whyItMatters:
        'Pupils are more likely to contribute and persist when they feel safe, included, and respected in the classroom.',
      currentGoal:
        'Increase participation from quieter pupils during whole-class discussion.',
      progressNotes:
        'You are creating a warm classroom tone, but structured participation from quieter pupils is still developing.',
      baselineProgress: 18,
      colorToken: 'amber',
      techniques: [
        {
          id: 'participation-structure',
          title: 'Structure participation',
          summary:
            'Use brief paired thinking and planned prompts so more pupils are ready to contribute.',
          steps: [
            'Give short thinking time before discussion',
            'Use talk stems to scaffold responses',
            'Invite a wider range of pupils into discussion',
          ],
          classroomExample:
            'Pupils rehearse an idea with a partner before sharing an answer in whole-class discussion.',
          tried: true,
          bookmarked: false,
          lastTriedAt: '2026-02-25T10:45:00.000Z',
        },
        {
          id: 'normalize-rehearsal',
          title: 'Normalize rehearsal before sharing',
          summary:
            'Use low-stakes rehearsal so quieter pupils can test an idea before speaking to the whole class.',
          steps: [
            'Give a short sentence stem',
            'Let pupils rehearse with a partner',
            'Invite answers after pupils have already said the idea once',
          ],
          classroomExample:
            'Pupils say one sentence to a partner before you ask for whole-class responses.',
          tried: false,
          bookmarked: true,
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
        {
          id: 'resource-supportive-2',
          title: 'Talk routines for quieter pupils',
          description:
            'Short routines that help more pupils rehearse and contribute ideas during whole-class discussion.',
          type: 'article',
          duration: '6 min read',
          url: 'https://example.com/talk-routines-for-quieter-pupils',
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
        'Pupils gave fuller answers when I used open questions, and several justified their thinking with examples from the text.',
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
      wentWell:
        'More pupils offered thoughtful responses once I stopped rephrasing the question too quickly.',
      improveNext:
        'I need to keep the same wait time during the whole lesson, not only when I have planned the question in advance.',
      createdAt: '2026-03-17T14:05:00.000Z',
    },
    {
      id: 'reflection-3',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      techniqueId: 'no-hands-up',
      confidence: 3,
      wentWell:
        'More pupils stayed ready to answer when I selected rather than taking volunteers straight away.',
      improveNext:
        'I need a sharper follow-up so pupils build on each other’s answers rather than stopping after one response.',
      createdAt: '2026-03-10T11:20:00.000Z',
    },
    {
      id: 'reflection-4',
      focusAreaId: 'feedback',
      focusAreaName: 'Feedback',
      techniqueId: 'actionable-feedback',
      confidence: 4,
      wentWell:
        'Pupils improved more quickly when the feedback focused on one concrete action instead of several points at once.',
      improveNext:
        'I need to protect time for pupils to make the change in lesson rather than returning to it the following day.',
      createdAt: '2026-03-12T13:25:00.000Z',
    },
    {
      id: 'reflection-5',
      focusAreaId: 'classroom-routines',
      focusAreaName: 'Classroom Routines',
      techniqueId: 'entry-routines',
      confidence: 4,
      wentWell:
        'Pupils settled more quickly when the first task was ready on the board before they entered.',
      improveNext:
        'I still need to reinforce the first thirty seconds so equipment is ready without repeated reminders.',
      createdAt: '2026-03-16T08:35:00.000Z',
    },
    {
      id: 'reflection-6',
      focusAreaId: 'classroom-routines',
      focusAreaName: 'Classroom Routines',
      techniqueId: 'do-now-start',
      confidence: 3,
      wentWell:
        'The retrieval start reduced drift at the beginning of the lesson and gave me a calmer launch into instruction.',
      improveNext:
        'The task needs to be even more routine so pupils start immediately without asking what to do first.',
      createdAt: '2026-03-06T08:42:00.000Z',
    },
    {
      id: 'reflection-7',
      focusAreaId: 'supportive-environment',
      focusAreaName: 'Supportive Environment',
      techniqueId: 'participation-structure',
      confidence: 3,
      wentWell:
        'Quieter pupils were more willing to contribute after paired rehearsal and sentence stems.',
      improveNext:
        'I need to return to the same talk stems for longer so pupils use them more confidently without extra prompting.',
      createdAt: '2026-02-25T10:52:00.000Z',
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
    {
      id: 'evidence-3',
      focusAreaId: 'classroom-routines',
      focusAreaName: 'Classroom Routines',
      sourceType: 'mentor-observation',
      title: 'Lesson starts are calmer when the do-now task is already visible',
      summary:
        'Observation notes show pupils begin more purposefully when the first task is displayed before entry and materials are ready immediately.',
      insightTitle: 'Make lesson starts more automatic',
      insightDescription:
        'The strongest lesson starts happened when pupils could begin immediately, without waiting for verbal direction.',
      createdAt: '2026-03-15T08:20:00.000Z',
      status: 'new',
    },
    {
      id: 'evidence-4',
      focusAreaId: 'supportive-environment',
      focusAreaName: 'Supportive Environment',
      sourceType: 'student-survey',
      title: 'Quieter pupils are more likely to contribute after paired rehearsal',
      summary:
        'Pupil survey comments suggest more pupils feel ready to answer when they have a brief moment to rehearse with a partner first.',
      insightTitle: 'Keep rehearsal before whole-class discussion',
      insightDescription:
        'Paired rehearsal appears to lower the barrier to participation for pupils who do not usually volunteer quickly.',
      createdAt: '2026-03-01T12:05:00.000Z',
      status: 'new',
    },
    {
      id: 'evidence-5',
      focusAreaId: 'questioning',
      focusAreaName: 'Questioning',
      sourceType: 'mentor-observation',
      title: 'Follow-up prompts are strongest when they press for evidence',
      summary:
        'Observation notes suggest the most successful questioning moments came when pupils were asked to justify answers using evidence rather than simply repeat them.',
      insightTitle: 'Press for evidence more consistently',
      insightDescription:
        'The next improvement in questioning may be not only who answers, but how often pupils are asked to justify their response.',
      createdAt: '2026-03-08T11:30:00.000Z',
      status: 'used',
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
    {
      id: 'insight-3',
      focusAreaId: 'feedback',
      focusAreaName: 'Feedback',
      reflectionId: 'reflection-4',
      sourceType: 'reflection',
      title: 'Give one next step and protect response time',
      description:
        'Feedback landed best when it named one improvement and pupils acted on it straight away.',
      createdAt: '2026-03-12T13:30:00.000Z',
      status: 'goal',
    },
    {
      id: 'insight-4',
      focusAreaId: 'classroom-routines',
      focusAreaName: 'Classroom Routines',
      evidenceId: 'evidence-3',
      sourceType: 'evidence',
      title: 'Make lesson starts more automatic',
      description:
        'The strongest lesson starts happened when pupils could begin immediately, without waiting for verbal direction.',
      createdAt: '2026-03-15T08:30:00.000Z',
      status: 'new',
    },
    {
      id: 'insight-5',
      focusAreaId: 'supportive-environment',
      focusAreaName: 'Supportive Environment',
      reflectionId: 'reflection-7',
      sourceType: 'reflection',
      title: 'Paired rehearsal increases confidence to contribute',
      description:
        'Quieter pupils were more prepared to answer once they had rehearsed an idea before whole-class talk.',
      createdAt: '2026-02-25T10:58:00.000Z',
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
    {
      id: 'goal-2',
      focusAreaId: 'feedback',
      focusAreaName: 'Feedback',
      insightId: 'insight-3',
      title: 'Narrow feedback to one next step',
      description:
        'Reduce feedback overload so pupils leave each lesson knowing the one improvement they need to make next.',
      createdAt: '2026-03-13T08:15:00.000Z',
      status: 'completed',
    },
    {
      id: 'goal-3',
      focusAreaId: 'classroom-routines',
      focusAreaName: 'Classroom Routines',
      insightId: 'insight-4',
      title: 'Make lesson starts more automatic',
      description:
        'Have the first task visible before pupils enter so the class starts work without waiting for repeated direction.',
      createdAt: '2026-03-15T08:40:00.000Z',
      status: 'completed',
    },
  ],
  activeGoalId: 'goal-1',
};
