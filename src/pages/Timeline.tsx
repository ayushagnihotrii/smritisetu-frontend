import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TIMELINE_EVENTS, TimelineEvent } from '@/mocks/timelineEvents';
import { 
  Calendar, 
  MapPin, 
  Quote, 
  BookOpen, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sliders, 
  Eye, 
  ExternalLink,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoTour, setIsAutoTour] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const threeStateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    nodes: THREE.Mesh[];
    targetZ: number;
    currentZ: number;
    animId: number | null;
  } | null>(null);

  const filteredEvents = activeCategory === 'all'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter((e) => e.category === activeCategory);

  // Initialize Three.js 3D Perspective Rail
  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A111C');
    scene.fog = new THREE.FogExp2('#0A111C', 0.012);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 3, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xDCB35C, 2.5, 50);
    goldPointLight.position.set(0, 5, 5);
    scene.add(goldPointLight);

    // Glowing Golden Central Spine Rail
    const railGeometry = new THREE.CylinderGeometry(0.12, 0.12, 350, 16);
    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0xDCB35C,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x5a3e10,
    });
    const rail = new THREE.Mesh(railGeometry, railMaterial);
    rail.rotation.x = Math.PI / 2;
    rail.position.set(0, 0, -150);
    scene.add(rail);

    // Milestone Event Nodes in 3D Space
    const nodeMeshes: THREE.Mesh[] = [];
    filteredEvents.forEach((evt, idx) => {
      const zPos = -idx * 10;
      const xPos = idx % 2 === 0 ? 3.5 : -3.5;
      const yPos = 1.2;

      // Sphere Milestone Marker
      const geom = new THREE.SphereGeometry(0.8, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0xDCB35C : 0xf0c36d,
        emissive: 0x223C63,
        roughness: 0.2,
        metalness: 0.6
      });
      const node = new THREE.Mesh(geom, mat);
      node.position.set(xPos, yPos, zPos);
      node.userData = { event: evt, index: idx };
      scene.add(node);
      nodeMeshes.push(node);

      // Connecting Brass Stanchion
      const stanchionGeom = new THREE.CylinderGeometry(0.04, 0.04, Math.abs(xPos), 8);
      const stanchionMat = new THREE.MeshStandardMaterial({ color: 0x8A7036 });
      const stanchion = new THREE.Mesh(stanchionGeom, stanchionMat);
      stanchion.rotation.z = Math.PI / 2;
      stanchion.position.set(xPos / 2, 0, zPos);
      scene.add(stanchion);
    });

    threeStateRef.current = {
      scene,
      camera,
      renderer,
      nodes: nodeMeshes,
      targetZ: 10,
      currentZ: 10,
      animId: null
    };

    // Render loop
    const animate = () => {
      if (!threeStateRef.current) return;
      const state = threeStateRef.current;

      state.currentZ += (state.targetZ - state.currentZ) * 0.08;
      state.camera.position.z = state.currentZ;
      state.camera.lookAt(0, 0, state.currentZ - 15);

      // Gentle rotation of nodes
      state.nodes.forEach((n) => {
        n.rotation.y += 0.01;
      });

      state.renderer.render(state.scene, state.camera);
      state.animId = requestAnimationFrame(animate);
    };

    threeStateRef.current.animId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !threeStateRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      threeStateRef.current.camera.aspect = w / h;
      threeStateRef.current.camera.updateProjectionMatrix();
      threeStateRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeStateRef.current?.animId) {
        cancelAnimationFrame(threeStateRef.current.animId);
      }
      renderer.dispose();
    };
  }, [viewMode, activeCategory]);

  // Navigate along 3D timeline
  const navigateToEvent = (idx: number) => {
    setCurrentIdx(idx);
    if (threeStateRef.current) {
      threeStateRef.current.targetZ = -idx * 10 + 10;
    }
  };

  // Auto-tour timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoTour) {
      interval = setInterval(() => {
        setCurrentIdx((prev) => {
          const next = (prev + 1) % filteredEvents.length;
          navigateToEvent(next);
          return next;
        });
      }, 4500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoTour, filteredEvents.length]);

  const activeEvent = filteredEvents[currentIdx];

  const categories = [
    { key: 'all', label: 'All Milestones' },
    { key: 'education', label: 'Education & Academics' },
    { key: 'social-movement', label: 'Social Movements' },
    { key: 'constitution', label: 'Constitution & Law' },
    { key: 'labour', label: 'Labour & Industry' },
    { key: 'dhamma', label: 'Dhamma & Philosophy' },
  ];

  return (
    <div className="bg-[#0F172A] min-h-screen text-slate-300 flex flex-col justify-between">
      {/* Top Header */}
      <div className="bg-[#152033] border-b border-slate-700/60 py-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded bg-[#DCB35C]/15 text-[#DCB35C] font-mono text-[10px] font-semibold uppercase tracking-wider">
                3D Interactive Journey
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-mono text-[10px] tracking-wider">
                1891 — 1956
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Life Timeline of Dr. B. R. Ambedkar <span className="text-[#DCB35C] font-normal text-xl">| जीवन यात्रा</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-[#1E293B] p-0.5 rounded-lg border border-slate-700/70 text-xs font-mono">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === '3d' ? 'bg-[#DCB35C] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                3D Perspective
              </button>
              <button
                onClick={() => setViewMode('2d')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === '2d' ? 'bg-[#DCB35C] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                2D Accessible View
              </button>
            </div>

            <Button
              onClick={() => setIsAutoTour(!isAutoTour)}
              variant="secondary"
              size="sm"
              icon={isAutoTour ? <Pause className="w-4 h-4 text-[#DCB35C]" /> : <Play className="w-4 h-4 text-[#DCB35C]" />}
            >
              {isAutoTour ? 'Pause Tour' : 'Auto Tour'}
            </Button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-[#0F172A] border-b border-slate-700/60 px-4 py-2.5">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setCurrentIdx(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-colors ${
                activeCategory === cat.key
                  ? 'bg-[#DCB35C] text-slate-950 font-bold shadow-sm'
                  : 'bg-[#1E293B] text-slate-400 hover:text-white hover:bg-[#283850]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: 3D Canvas vs 2D List */}
      <div className="flex-1 relative min-h-[500px] flex items-center justify-center overflow-hidden">
        {viewMode === '3d' ? (
          <>
            {/* 3D WebGL Canvas Viewport */}
            <div ref={containerRef} className="w-full h-[65vh] sm:h-[72vh] relative" />

            {/* Floating Live Milestone Card (Left Flank) */}
            {activeEvent && (
              <div className="absolute left-6 bottom-8 max-w-sm sm:max-w-md bg-[#1E293B]/95 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md z-20">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#0F172A] px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                    {activeEvent.category}
                  </span>
                  <span className="font-mono text-xl font-bold text-[#DCB35C]">{activeEvent.year}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-1">{activeEvent.title}</h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#DCB35C]" />
                  <span>{activeEvent.place}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {activeEvent.summary}
                </p>

                {activeEvent.quote && (
                  <blockquote className="p-3 rounded-lg bg-[#152033] border-l-2 border-[#DCB35C] text-xs font-serif italic text-white mb-4">
                    “{activeEvent.quote}”
                  </blockquote>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                  <Button
                    onClick={() => setSelectedEvent(activeEvent)}
                    variant="primary"
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                  >
                    Examine Event Record
                  </Button>

                  {activeEvent.linkedDocId && (
                    <a
                      href={`/archive?doc=${activeEvent.linkedDocId}`}
                      className="text-xs font-mono text-[#DCB35C] hover:underline flex items-center gap-1"
                    >
                      <span>Archival Proof &rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          /* 2D Accessible List Fallback for low-end devices */
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 w-full space-y-4">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="bg-[#1E293B] hover:bg-[#23354F] border border-slate-700/60 hover:border-slate-500 rounded-2xl p-6 transition-all cursor-pointer shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-2xl font-bold text-[#DCB35C]">{evt.year}</span>
                    <span className="bg-[#0F172A] px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                      {evt.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#DCB35C]" />
                    <span>{evt.place}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-white mb-2">{evt.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{evt.summary}</p>

                {evt.quote && (
                  <p className="text-xs font-serif italic text-[#DCB35C]">“{evt.quote}”</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Timeline Year Scrubber Navigation */}
      <div className="bg-[#0F172A] border-t border-slate-700/60 p-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <button
            onClick={() => navigateToEvent(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="p-2.5 bg-[#1E293B] text-white hover:bg-[#283850] disabled:opacity-30 rounded-lg border border-slate-700/60 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Quick Year Nodes Scrubber Bar */}
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto py-1">
            {filteredEvents.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => navigateToEvent(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  idx === currentIdx
                    ? 'bg-[#DCB35C] text-slate-950 shadow-md scale-105'
                    : 'bg-[#1E293B] text-slate-400 hover:text-white border border-slate-700/60'
                }`}
              >
                {evt.year}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigateToEvent(Math.min(filteredEvents.length - 1, currentIdx + 1))}
            disabled={currentIdx === filteredEvents.length - 1}
            className="p-2.5 bg-[#1E293B] text-white hover:bg-[#283850] disabled:opacity-30 rounded-lg border border-slate-700/60 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Event Details Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent ? `${selectedEvent.year} • ${selectedEvent.title}` : ''}
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="h-56 rounded-xl overflow-hidden bg-[#121E33] border border-[#DCB35C]/30">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#DCB35C]">
              <MapPin className="w-4 h-4" />
              <span>{selectedEvent.place} • {selectedEvent.date}</span>
            </div>

            <p className="text-sm text-white font-serif leading-relaxed">
              {selectedEvent.description}
            </p>

            {selectedEvent.quote && (
              <blockquote className="p-4 bg-[#121E33] border-l-4 border-[#DCB35C] rounded-r-xl font-serif text-sm italic text-[#f0c36d]">
                “{selectedEvent.quote}”
              </blockquote>
            )}

            {selectedEvent.linkedDocId && (
              <div className="pt-2">
                <Button
                  onClick={() => {
                    const id = selectedEvent.linkedDocId;
                    setSelectedEvent(null);
                    window.location.href = `/archive?doc=${id}`;
                  }}
                  variant="primary"
                  className="w-full"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Examine Original Archival Document
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
