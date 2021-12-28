import React from 'react';
import { useDrag } from 'react-dnd';

export default function DraggableComponent(props) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'Box',
  }));
  return <div ref={dragPreview} />;
}
