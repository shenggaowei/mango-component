import interact from 'interactjs';

interface IDraggable {
  selector: string;
  onEnd?: (position: { x: number; y: number }) => void;
  onStart?: (...args: any[]) => void;
}

export default function draggable(option: IDraggable) {
  const { selector, onEnd, onStart } = option;
  interact(selector).draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'html',
        endOnly: true,
      }),
    ],
    autoScroll: true,
    listeners: {
      move: dragMoveListener,
      start() {
        if (onStart) {
          onStart();
        }
      },
      end(event) {
        const { page } = event;
        if (onEnd) {
          onEnd(page);
        }
      },
    },
  });

  function dragMoveListener(event: any) {
    const target = event.target;

    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
}
