// js/views/TourView.js
export class TourView {
  constructor(containerEl, onNextStep) {
    this.container = containerEl;
    this.onNextStep = onNextStep;
  }

  render(currentStepIndex, tourSteps) {
    const step = tourSteps[currentStepIndex];
    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="tour-badge" style="background: #3b82f6; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;">
              STEP ${currentStepIndex + 1} OF ${tourSteps.length}
            </span>
            <span style="font-size: 0.75rem; color: #93c5fd; font-weight: 700; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">
              ACTOR: ${step.actor}
            </span>
          </div>

          <div class="tour-controls">
            <button id="btn-tour-auto" class="btn-primary btn-small" style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 600;">
              ${currentStepIndex === tourSteps.length - 1 ? '[RESTART WALKTHROUGH]' : '[EXECUTE STEP ' + (currentStepIndex + 1) + ' ->]'}
            </button>
          </div>
        </div>

        <div style="font-size: 0.82rem; line-height: 1.4; color: #f8fafc;">
          <strong>Action:</strong> ${step.actionText}
          <span style="color: #94a3b8; margin-left: 8px;">| <strong>Why:</strong> ${step.whyText}</span>
        </div>
      </div>
    `;

    this.container.querySelector('#btn-tour-auto').addEventListener('click', () => {
      this.onNextStep();
    });
  }
} 