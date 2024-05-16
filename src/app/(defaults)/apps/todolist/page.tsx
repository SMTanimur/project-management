import ComponentsAppsTodoList from '@/components/apps/todolist/components-apps-todolist';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'TodoList',
};

const TodoList = () => {
    return <ComponentsAppsTodoList />;
};

export default TodoList;
