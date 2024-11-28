# TODOS:



## Noch zu tun:
- Homepage: Abstand zwischen Komponenten, wenn der Bildschirm klein ist



- Dashboard (handyversion) zu breit
- Dashboard margin bottom in Handyversion
- Backend Schedule Funktion reparieren und Tests schreiben
- Tests für das Frontend schreiben



## Funktioniert schon:
- Fixkosten löschen können ohne verbundene Transaktionen zu entfernen (backend) 
- Search-button liegt über Formular
- Menu (Handy Version) liegt nicht immer im Vordergrund (details zB)
- Handy version Formulare können nicht mehr geschloßen werden
- Hamburger Menu (Bildschirm klein) oben links am Bildschirmrand
- Navbar Handyversion Bild kleiner machen (oder entfernen)
- margins anpassen (überall gleich)
- Sort-by button sieht disabled aus


Fehlermeldung backend:
org.hibernate.LazyInitializationException: failed to lazily initialize a collection of role: org.example.backendmoneymaker.entities.Account.fixedCosts: could not initialize proxy - no Session
	at org.hibernate.collection.spi.AbstractPersistentCollection.throwLazyInitializationException(AbstractPersistentCollection.java:636) ~[hibernate-core-6.5.3.Final.jar:6.5.3.Final]
	at org.hibernate.collection.spi.AbstractPersistentCollection.withTemporarySessionIfNeeded(AbstractPersistentCollection.java:219) ~[hibernate-core-6.5.3.Final.jar:6.5.3.Final]
	at org.hibernate.collection.spi.AbstractPersistentCollection.initialize(AbstractPersistentCollection.java:615) ~[hibernate-core-6.5.3.Final.jar:6.5.3.Final]
	at org.hibernate.collection.spi.AbstractPersistentCollection.read(AbstractPersistentCollection.java:138) ~[hibernate-core-6.5.3.Final.jar:6.5.3.Final]
	at org.hibernate.collection.spi.PersistentBag.iterator(PersistentBag.java:369) ~[hibernate-core-6.5.3.Final.jar:6.5.3.Final]
	at org.example.backendmoneymaker.services.FixedCostServiceImpl.generateTransactions(FixedCostServiceImpl.java:50) ~[classes/:na]
	at org.example.backendmoneymaker.services.FixedCostServiceImpl.generateTransactionsForAllAccounts(FixedCostServiceImpl.java:37) ~[classes/:na]
	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:580) ~[na:na]
	at org.springframework.scheduling.support.ScheduledMethodRunnable.runInternal(ScheduledMethodRunnable.java:130) ~[spring-context-6.1.14.jar:6.1.14]
	at org.springframework.scheduling.support.ScheduledMethodRunnable.lambda$run$2(ScheduledMethodRunnable.java:124) ~[spring-context-6.1.14.jar:6.1.14]
	at io.micrometer.observation.Observation.observe(Observation.java:499) ~[micrometer-observation-1.13.6.jar:1.13.6]
	at org.springframework.scheduling.support.ScheduledMethodRunnable.run(ScheduledMethodRunnable.java:124) ~[spring-context-6.1.14.jar:6.1.14]
	at org.springframework.scheduling.support.DelegatingErrorHandlingRunnable.run(DelegatingErrorHandlingRunnable.java:54) ~[spring-context-6.1.14.jar:6.1.14]
	at org.springframework.scheduling.concurrent.ReschedulingRunnable.run(ReschedulingRunnable.java:96) ~[spring-context-6.1.14.jar:6.1.14]
	at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:572) ~[na:na]
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:317) ~[na:na]
	at java.base/java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:304) ~[na:na]
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1144) ~[na:na]
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:642) ~[na:na]
	at java.base/java.lang.Thread.run(Thread.java:1575) ~[na:na]
