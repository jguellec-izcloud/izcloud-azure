const stats = [
  { value: "24/7", label: "Surveillance Active" },
  { value: "95%", label: "Résolution des Incidents à Distance" },
  { value: "19+", label: "Années d'Expertise chez les leaders technologiques" },
  { value: "100%", label: "Tranquillité d'Esprit" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
