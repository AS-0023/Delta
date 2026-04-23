import React from "react";
import {
  BarChart,
  MessageSquare,
  Zap,
  Target,
  ArrowUpRight,
  CheckSquare,
  RefreshCcw,
  LayoutDashboard,
  Activity,
  KanbanSquare,
  Network,
  PieChart,
} from "lucide-react";
import "./AllFeaturesGrid.css";

const AllFeaturesGrid = () => {
  return (
    <section className="all-features-grid-section">
      <div className="features-grid-container">
        {/* Row 1 */}
        <div className="feature-card">
          <div className="card-image-top bg-purple">
            {/* Mockup 1: Goals */}
            <div className="mockup-window">
              <div className="mockup-header">
                <div className="mockup-dot red"></div>
                <div className="mockup-dot yellow"></div>
                <div className="mockup-dot green"></div>
              </div>
              <div className="mockup-body layout-split">
                <div className="mockup-sidebar">
                  <div className="mockup-pie-chart">
                    <div className="pie-slice"></div>
                    <div className="pie-inner">33%</div>
                  </div>
                  <div className="mockup-line w-full"></div>
                  <div className="mockup-line w-3/4"></div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-title">Goals</div>
                  <div className="progress-bar-stack">
                    <div className="bar green-bar"></div>
                    <div className="bar yellow-bar"></div>
                    <div className="bar red-bar"></div>
                  </div>
                  <div className="goal-list">
                    <div className="goal-item">
                      <div className="goal-icon green"></div>
                      <div className="mockup-line w-half"></div>
                    </div>
                    <div className="goal-item">
                      <div className="goal-icon green"></div>
                      <div className="mockup-line w-3/4"></div>
                    </div>
                    <div className="goal-item">
                      <div className="goal-icon orange"></div>
                      <div className="mockup-line w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <BarChart className="feature-icon blue-text" size={28} />
            <h3>Track your progress to Goals</h3>
            <p>
              Get visibility on your company's progress towards top priorities
              as projects advance
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-image-top bg-light">
            <div className="mockup-window">
              <div className="mockup-body layout-split reverse">
                <div className="mockup-kanban">
                  <div className="kanban-column">
                    <div className="kanban-header">IN REVIEW</div>
                    <div className="kanban-card"></div>
                    <div className="kanban-card yellow-bg"></div>
                  </div>
                  <div className="kanban-column">
                    <div className="kanban-header">DONE</div>
                    <div className="kanban-card"></div>
                    <div className="kanban-card"></div>
                  </div>
                </div>
                <div className="mockup-chat">
                  <div className="chat-bubble">
                    Hey, Jessie
                    <br />
                    Pick a conversation starter...
                  </div>
                  <div className="chat-option">Find information</div>
                  <div className="chat-option">Rephrase content</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <KanbanSquare className="feature-icon blue-text" size={28} />
            <h3>Share real-time updates</h3>
            <p>
              Keep stakeholders up-to-date on the current status and use
              AI-agents to proactively identify risks as work items progress.
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="feature-card">
          <div className="card-image-top bg-green">
            <div className="mockup-window">
              <div className="mockup-body layout-split">
                <div className="mockup-sidebar gmail">
                  <div className="mockup-line short bold"></div>
                  <div className="mockup-line"></div>
                  <div className="mockup-line"></div>
                  <div className="mockup-line"></div>
                </div>
                <div className="mockup-content overlay-modal">
                  <div className="modal-header blue">
                    Atlassian <span className="close-btn"></span>
                  </div>
                  <div className="modal-body">
                    <div className="mockup-title small">Manage work items</div>
                    <div className="mockup-btn-group">
                      <div className="m-btn">+ Create</div>
                      <div className="m-btn">Find</div>
                    </div>
                    <div className="m-list-item">
                      DESIGN-21 <br /> Create prototype
                    </div>
                    <div className="m-list-item">
                      DESIGN-22 <br /> Conduct research
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <Activity className="feature-icon blue-text" size={28} />
            <h3>Track work where you work</h3>
            <p>
              Keep work up-to-date by tracking progress from your favorite tools
              like Slack, Figma and Gmail powered by an AI-assist
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-image-top bg-dark">
            <div className="mockup-window dark-mode">
              <div className="dark-header">
                <div className="tab active">Timeline</div>
                <div className="tab">Board</div>
                <div className="tab">List</div>
              </div>
              <div className="dark-body">
                <div className="gantt-row">
                  <div className="g-task w-1"></div>
                </div>
                <div className="gantt-row">
                  <div className="g-task w-3 green"></div>
                </div>
                <div className="gantt-row">
                  <div className="g-task w-2 orange"></div>
                </div>
                <div className="gantt-row">
                  <div className="g-task w-4 blue offset-1"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <PieChart className="feature-icon blue-text" size={28} />
            <h3>Monitor progress</h3>
            <p>
              Stay up-to-date on the work's progress using the view you like:
              boards, lists, timeline, or calendars.
            </p>
          </div>
        </div>

        {/* Row 4 */}
        <div className="feature-card">
          <div className="card-image-top bg-blue">
            <div className="mockup-window align-goals">
              <div className="align-header">
                <div className="title-large">Develop and Launch Portal</div>
                <div className="status-badge">On track</div>
              </div>
              <div className="align-list">
                <div className="a-item">
                  <span className="dot orange"></span> Portal Launch{" "}
                  <span className="badge">AT RISK</span>
                </div>
                <div className="a-item">
                  <span className="dot green"></span> Mobile Checkout{" "}
                  <span className="badge green">ON TRACK</span>
                </div>
                <div className="a-item">
                  <span className="dot orange"></span> Create APIs{" "}
                  <span className="badge blue">IN PROGRESS</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <ArrowUpRight className="feature-icon blue-text" size={28} />
            <h3>Align work to goals</h3>
            <p>
              Focus on work that will deliver impact and find cross-functional
              partners working towards the same goal
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-image-top bg-light">
            <div className="mockup-window">
              <div className="mockup-header-plain">
                Implement Control System Simulations
              </div>
              <div className="mockup-suggested">
                <div className="s-title">Create suggested work items</div>
                <div className="s-item">
                  <span className="check">✓</span> TIC-189 Engage Hotel
                </div>
                <div className="s-item">
                  <span className="check">✓</span> TIC-190 Infographic
                </div>
                <div className="s-item text-muted">
                  TIC-186 Adapt apps to payment
                </div>
                <div className="s-input-box">What should I do next?</div>
                <div className="s-btn right">Create all</div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <CheckSquare className="feature-icon blue-text" size={28} />
            <h3>Plan and Assign Work</h3>
            <p>
              Breakdown big ideas into actionable tasks and automatically assign
              them to the right person with Rovo AI.
            </p>
          </div>
        </div>

        {/* Row 5 - Automate & Remove Manual Work (Side by Side) */}
        <div className="feature-card">
          <div className="card-image-top bg-light flex-center">
            <div className="mockup-window large">
              <div className="mockup-body layout-split workflow-split flex-col">
                <div className="workflow-diagram wrap">
                  <div className="workflow-node dark">START</div>
                  <div className="workflow-arrow"></div>
                  <div className="workflow-node outline blue">IN PROGRESS</div>
                  <div className="workflow-arrow"></div>
                  <div className="workflow-node outline green">DONE</div>
                </div>
                <div className="workflow-chat">
                  <div className="chat-header">Workflow Builder</div>
                  <div className="chat-msg left">
                    Here's the newly created status. Add to workflow?
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <Zap className="feature-icon blue-text" size={28} />
            <h3>Automate workflows</h3>
            <p>
              Scale processes and save time with customizable workflows that
              integrate with your tech stack.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-image-top bg-gradient">
            <div className="mockup-window center-focus">
              <div className="automation-box">
                <div className="a-title">Create rules with AI</div>
                <div className="a-input">
                  When request submitted, create task...
                </div>
                <div className="a-footer">
                  <span>✨ AI is typing...</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text-bottom">
            <RefreshCcw className="feature-icon blue-text" size={28} />
            <h3>Remove manual work</h3>
            <p>
              Use Rovo AI to create custom automations to keep your status up to
              date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllFeaturesGrid;
