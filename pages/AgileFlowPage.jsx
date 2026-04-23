import React, { useState } from 'react';
import './AgileFlowPage.css';
import { LayoutDashboard, Target, Briefcase, Trello, Calendar, Settings, Bell, Search, User, Filter, Plus, MessageSquare, Paperclip, Clock } from 'lucide-react';

const initialTasks = {
    todo: [
        { id: 'T-1', title: 'Design Database Schema', priority: 'High', epic: 'Backend Auth', assignee: 'JD' },
        { id: 'T-2', title: 'Setup JWT Authentication', priority: 'High', epic: 'Backend Auth', assignee: 'JD' },
    ],
    inProgress: [
        { id: 'T-3', title: 'Kanban Board UI', priority: 'Medium', epic: 'Frontend Dashboard', assignee: 'SM' },
    ],
    review: [
        { id: 'T-4', title: 'Goal Management APIs', priority: 'Low', epic: 'Goal Module', assignee: 'RK' },
    ],
    done: [
        { id: 'T-5', title: 'Initial Project Setup', priority: 'High', epic: 'Core Setup', assignee: 'SM' },
    ]
};

const AgileFlowPage = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [draggedTask, setDraggedTask] = useState(null);
    const [draggedFromSource, setDraggedFromSource] = useState(null);

    // Drag and drop logic
    const handleDragStart = (e, task, sourceCol) => {
        setDraggedTask(task);
        setDraggedFromSource(sourceCol);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetCol) => {
        e.preventDefault();
        if (!draggedTask) return;

        if (draggedFromSource === targetCol) return; // Same column

        const updatedColSource = tasks[draggedFromSource].filter(t => t.id !== draggedTask.id);
        const updatedColTarget = [...tasks[targetCol], draggedTask];

        setTasks({
            ...tasks,
            [draggedFromSource]: updatedColSource,
            [targetCol]: updatedColTarget
        });

        setDraggedTask(null);
        setDraggedFromSource(null);
    };

    const totalTasks = Object.values(tasks).flat().length;
    const doneTasks = tasks.done.length;
    const goalProgress = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

    return (
        <div className="agileflow-app">
            {/* Sidebar Navigation */}
            <aside className="af-sidebar">
                <div className="af-brand">
                    <Trello color="#60a5fa" size={28} />
                    <h2>AgileFlow</h2>
                </div>

                <nav className="af-nav">
                    <div className="af-nav-group">Main</div>
                    <a href="#dash" className="af-nav-link active"><LayoutDashboard size={18} /> Dashboard</a>
                    <a href="#goals" className="af-nav-link"><Target size={18} /> Goals & OKRs</a>
                    <a href="#epics" className="af-nav-link"><Briefcase size={18} /> Epics</a>

                    <div className="af-nav-group mt-4">Workspace</div>
                    <a href="#board" className="af-nav-link"><Trello size={18} /> Kanban Board</a>
                    <a href="#sprints" className="af-nav-link"><Calendar size={18} /> Active Sprints</a>
                </nav>

                <div className="af-nav-bottom">
                    <a href="#settings" className="af-nav-link"><Settings size={18} /> Settings</a>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="af-main">
                {/* Top Header */}
                <header className="af-header">
                    <div className="af-search-bar">
                        <Search size={18} color="#9ca3af" />
                        <input type="text" placeholder="Search tasks, goals, or epics..." />
                    </div>
                    <div className="af-header-right">
                        <div className="af-action-btn"><Bell size={20} /></div>
                        <div className="af-user-profile">
                            <span>Admin User</span>
                            <div className="af-avatar"><User size={18} /></div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="af-content">
                    <div className="af-page-title">
                        <h1>Sprint 4 - Beta Release</h1>
                        <button className="af-btn-primary"><Plus size={16} /> Create Task</button>
                    </div>

                    {/* Quick Analytics Metrics */}
                    <div className="af-analytics-row">
                        <div className="af-metric-card">
                            <h3>Overall Goal Progress</h3>
                            <div className="af-progress-bar-container mt-2">
                                <div className="af-progress-bar bg-blue" style={{ width: `${goalProgress}%` }}></div>
                            </div>
                            <div className="af-metric-value mt-2">{goalProgress}% Completed</div>
                        </div>

                        <div className="af-metric-card">
                            <h3>Sprint Velocity</h3>
                            <div className="af-metric-value val-green">42 Story Points</div>
                            <div className="af-metric-sub">↑ 5% from last sprint</div>
                        </div>

                        <div className="af-metric-card">
                            <h3>Overdue Tasks</h3>
                            <div className="af-metric-value val-red">2 Tasks</div>
                            <div className="af-metric-sub">Requires attention</div>
                        </div>
                    </div>

                    {/* Filters Area */}
                    <div className="af-filters">
                        <div className="af-filter-btn"><Filter size={14} /> Filter </div>
                        <div className="af-filter-btn">Priority: All ▼</div>
                        <div className="af-filter-btn">Epic: Focus ▼</div>
                    </div>

                    {/* Kanban Board Area */}
                    <div className="af-kanban-board">
                        {/* Column: To Do */}
                        <div
                            className="af-kanban-col"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'todo')}
                        >
                            <div className="af-col-header">
                                <span className="af-col-title">To Do</span>
                                <span className="af-col-count">{tasks.todo.length}</span>
                            </div>
                            <div className="af-card-list">
                                {tasks.todo.map(task => (
                                    <KanbanCard key={task.id} task={task} source="todo" onDragStart={handleDragStart} />
                                ))}
                            </div>
                        </div>

                        {/* Column: In Progress */}
                        <div
                            className="af-kanban-col"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'inProgress')}
                        >
                            <div className="af-col-header">
                                <span className="af-col-title">In Progress</span>
                                <span className="af-col-count">{tasks.inProgress.length}</span>
                            </div>
                            <div className="af-card-list">
                                {tasks.inProgress.map(task => (
                                    <KanbanCard key={task.id} task={task} source="inProgress" onDragStart={handleDragStart} />
                                ))}
                            </div>
                        </div>

                        {/* Column: Review */}
                        <div
                            className="af-kanban-col"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'review')}
                        >
                            <div className="af-col-header">
                                <span className="af-col-title">In Review</span>
                                <span className="af-col-count">{tasks.review.length}</span>
                            </div>
                            <div className="af-card-list">
                                {tasks.review.map(task => (
                                    <KanbanCard key={task.id} task={task} source="review" onDragStart={handleDragStart} />
                                ))}
                            </div>
                        </div>

                        {/* Column: Done */}
                        <div
                            className="af-kanban-col"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'done')}
                        >
                            <div className="af-col-header">
                                <span className="af-col-title">Done</span>
                                <span className="af-col-count">{tasks.done.length}</span>
                            </div>
                            <div className="af-card-list">
                                {tasks.done.map(task => (
                                    <KanbanCard key={task.id} task={task} source="done" onDragStart={handleDragStart} />
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
};

// Kanban Card Component
const KanbanCard = ({ task, source, onDragStart }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return '#ef4444'; // Red
            case 'Medium': return '#f59e0b'; // Amber
            case 'Low': return '#3b82f6'; // Blue
            default: return '#9ca3af';
        }
    };

    return (
        <div
            className="af-card"
            draggable
            onDragStart={(e) => onDragStart(e, task, source)}
        >
            <div className="af-card-header">
                <span className="af-card-id">{task.id}</span>
                <div className="af-card-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
            </div>
            <p className="af-card-title">{task.title}</p>

            <div className="af-card-epic">
                <div className="af-epic-tag">{task.epic}</div>
            </div>

            <div className="af-card-footer">
                <div className="af-card-icons">
                    <MessageSquare size={14} /> <span className="text-xs ml-1">2</span>
                    <Paperclip size={14} className="ml-2" />
                </div>
                <div className="af-card-assignee">{task.assignee}</div>
            </div>
        </div>
    );
};

export default AgileFlowPage;
