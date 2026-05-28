import { useEffect, useRef, useState } from 'react';

export type VolumeZone = 'quiet' | 'elevated' | 'loud';

export type MicStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'unsupported';

const QUIET_MAX = 0.22;
const ELEVATED_MAX = 0.48;

export function levelToZone(level: number): VolumeZone {
  if (level < QUIET_MAX) return 'quiet';
  if (level < ELEVATED_MAX) return 'elevated';
  return 'loud';
}

export function useMicAmplitude(active: boolean) {
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState<MicStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setStatus('idle');
      setLevel(0);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported');
      setErrorMessage('This browser cannot access the microphone. Try Chrome or Safari over HTTPS.');
      return;
    }

    let stream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let cancelled = false;

    const start = async () => {
      setStatus('requesting');
      setErrorMessage(null);

      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.82;
        source.connect(analyser);

        const buffer = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
          analyser.getByteFrequencyData(buffer);
          let sum = 0;
          for (let i = 0; i < buffer.length; i += 1) {
            sum += buffer[i];
          }
          const normalized = sum / buffer.length / 255;
          setLevel(normalized);
          rafRef.current = requestAnimationFrame(tick);
        };

        tick();
        setStatus('active');
      } catch {
        if (cancelled) return;
        setStatus('denied');
        setErrorMessage(
          'Microphone access was blocked. Allow the mic in browser settings, then start again. On phones, HTTPS (or localhost) is required.',
        );
      }
    };

    void start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      stream?.getTracks().forEach((track) => track.stop());
      void audioContext?.close();
    };
  }, [active]);

  const zone = levelToZone(level);

  return { level, zone, status, errorMessage };
}
