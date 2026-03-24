import Typewriter from 'typewriter-effect';

export default function TypewriterLoading() {
    return (
    <div>
        <Typewriter
            options={{
                strings: ['Designing your trip...', 'Finding the best spots...', 'Finalizing the details...'],
                delay: 220,
                autoStart: true,
                loop: true,
            }}
        />
    </div>
);
}