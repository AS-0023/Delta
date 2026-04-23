import React from 'react';

const AllTemplatesPage = () => {
    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', textAlign: 'center', backgroundColor: '#f4f5f7' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>
                <h1 style={{ fontSize: '3rem', color: '#172b4d', marginBottom: '20px' }}>All Templates</h1>
                <p style={{ fontSize: '1.2rem', color: '#42526e', marginBottom: '40px' }}>
                    Explore our collection of templates to jumpstart your next project.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>
                    {/* Template Card 1 */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #dfe1e6' }}>
                        <div style={{ padding: '8px 12px', backgroundColor: '#e3fcef', color: '#006644', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '16px' }}>AGILE</div>
                        <h3 style={{ fontSize: '1.3rem', color: '#172b4d', marginBottom: '12px' }}>Scrum</h3>
                        <p style={{ color: '#5e6c84', fontSize: '0.95rem', marginBottom: '20px' }}>Visualize, track, and manage your work easily from sprint to sprint.</p>
                        <button style={{ backgroundColor: '#0052cc', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>Use Template</button>
                    </div>

                    {/* Template Card 2 */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #dfe1e6' }}>
                        <div style={{ padding: '8px 12px', backgroundColor: '#deebff', color: '#0747a6', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '16px' }}>AGILE</div>
                        <h3 style={{ fontSize: '1.3rem', color: '#172b4d', marginBottom: '12px' }}>Kanban</h3>
                        <p style={{ color: '#5e6c84', fontSize: '0.95rem', marginBottom: '20px' }}>Manage a continuous delivery of work on a powerful board.</p>
                        <button style={{ backgroundColor: '#0052cc', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>Use Template</button>
                    </div>

                    {/* Template Card 3 */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #dfe1e6' }}>
                        <div style={{ padding: '8px 12px', backgroundColor: '#eae6ff', color: '#403294', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '16px' }}>SOFTWARE</div>
                        <h3 style={{ fontSize: '1.3rem', color: '#172b4d', marginBottom: '12px' }}>Bug Tracking</h3>
                        <p style={{ color: '#5e6c84', fontSize: '0.95rem', marginBottom: '20px' }}>Track bugs, features, and tasks. Prioritize what needs attention.</p>
                        <button style={{ backgroundColor: '#0052cc', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>Use Template</button>
                    </div>

                    {/* Template Card 4 */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #dfe1e6' }}>
                        <div style={{ padding: '8px 12px', backgroundColor: '#fffae6', color: '#b38600', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '16px' }}>IT SERVICE</div>
                        <h3 style={{ fontSize: '1.3rem', color: '#172b4d', marginBottom: '12px' }}>IT Service Desk</h3>
                        <p style={{ color: '#5e6c84', fontSize: '0.95rem', marginBottom: '20px' }}>Manage incoming IT requests, incidents, and changes easily.</p>
                        <button style={{ backgroundColor: '#0052cc', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>Use Template</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTemplatesPage;
