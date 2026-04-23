import React, { useState } from 'react';
import './ScrumBoardPage.css';

const initialColumns = {
    'todo': {
        name: 'To Do',
        items: [
            { id: '1', content: 'Create project roadmap', assignee: 'SM', type: 'story' },
            { id: '2', content: 'Design landing page mockup', assignee: 'JD', type: 'task' },
        ],
    },
    'inProgress': {
        name: 'In Progress',
        items: [
            { id: '3', content: 'Implement authentication', assignee: 'PR', type: 'story' },
        ],
    },
    'done': {
        name: 'Done',
        items: [
            { id: '4', content: 'Set up repository', assignee: 'SM', type: 'task' },
        ],
    }
};

const ScrumBoardPage = () => {
    const [columns, setColumns] = useState(initialColumns);
    const [newTaskContent, setNewTaskContent] = useState('');
    const [activeCol, setActiveCol] = useState(null);

    const handleAddTask = (colId) => {
        if (!newTaskContent.trim()) return;
        const newItem = {
            id: Date.now().toString(),
            content: newTaskContent,
            assignee: 'ME',
            type: 'task'
        };
        setColumns({
            ...columns,
            [colId]: {
                ...columns[colId],
                items: [...columns[colId].items, newItem]
            }
        });
        setNewTaskContent('');
        setActiveCol(null);
    };

    const getTypeIcon = (type) => {
        if (type === 'story') {
            return <div className="type-icon story-icon"><svg viewBox="0 0 14 14" width="14" height="14"><rect width="14" height="14" rx="2" fill="#57D9A3" /><path d="M4 7h6v2H4z" fill="#fff" /></svg></div>;
        }
        return <div className="type-icon task-icon"><svg viewBox="0 0 14 14" width="14" height="14"><rect width="14" height="14" rx="2" fill="#4BCE97" /><path d="M5 9.5L3.5 8l-.7.7L5 10.9l6-6-.7-.7L5 9.5z" fill="#fff" /></svg></div>;
    };

    return (
        <div className="scrum-board-page">
            <div className="scrum-header">
                <div className="scrum-breadcrumbs">
                    <span>Projects</span> / <span>SOFTWARE DEV</span>
                </div>
                <h1>ANORYX Sprint 1</h1>
                <div className="scrum-toolbar">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="members">
                        <div className="member-avatar">SM</div>
                        <div className="member-avatar">JD</div>
                        <div className="member-avatar">PR</div>
                        <div className="member-avatar add-member">+</div>
                    </div>
                    <button className="btn-insight">Quick filters</button>
                    <button className="btn-complete-sprint">Complete sprint</button>
                </div>
            </div>

            <div className="board-container">
                {Object.entries(columns).map(([colId, column]) => (
                    <div className="board-column" key={colId}>
                        <div className="column-header">
                            <h3>{column.name.toUpperCase()}</h3>
                            <span className="item-count">{column.items.length}</span>
                        </div>
                        <div className="column-content">
                            {column.items.map((item) => (
                                <div className="board-card" key={item.id}>
                                    <p className="card-content">{item.content}</p>
                                    <div className="card-footer">
                                        <div className="card-tags">
                                            {getTypeIcon(item.type)}
                                            <span className="card-id">AN-{item.id.slice(-3)}</span>
                                        </div>
                                        <div className="card-assignee">{item.assignee}</div>
                                    </div>
                                </div>
                            ))}

                            {activeCol === colId ? (
                                <div className="add-card-form">
                                    <textarea
                                        autoFocus
                                        value={newTaskContent}
                                        onChange={(e) => setNewTaskContent(e.target.value)}
                                        placeholder="What needs to be done?"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleAddTask(colId);
                                            }
                                        }}
                                    />
                                    <div className="add-card-actions">
                                        <button className="btn-save" onClick={() => handleAddTask(colId)}>Save</button>
                                        <button className="btn-cancel" onClick={() => setActiveCol(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <button className="add-card-btn" onClick={() => setActiveCol(colId)}>
                                    + Create issue
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrumBoardPage;
