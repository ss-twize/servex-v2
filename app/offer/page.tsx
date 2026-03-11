import SectionWrapper from "@/components/ui/SectionWrapper";

export default function OfferPage() {
  return (
    <main className="min-h-screen pt-24">
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-sx-cream">
            Публичная оферта
          </h1>
          <p className="mt-4 text-sx-muted text-sm">
            ООО &laquo;СЕРВЕКС&raquo; &middot; Дата вступления в силу: 1 января 2026 г.
          </p>

          <div className="mt-12 space-y-10 text-sx-cream/90 text-[15px] leading-relaxed font-body">
            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                1. Термины и определения
              </h2>
              <p>В настоящей оферте используются следующие термины:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-sx-cream/80">
                <li>
                  <strong className="text-sx-cream">Исполнитель</strong> — ООО &laquo;СЕРВЕКС&raquo;,
                  предоставляющее доступ к Сервису.
                </li>
                <li>
                  <strong className="text-sx-cream">Заказчик</strong> — юридическое или физическое лицо,
                  акцептовавшее настоящую оферту.
                </li>
                <li>
                  <strong className="text-sx-cream">Сервис</strong> — программный продукт СЕРВЕКС,
                  доступный через сеть Интернет, обеспечивающий автоматизацию клиентского обслуживания.
                </li>
                <li>
                  <strong className="text-sx-cream">Подписка</strong> — оплаченный период доступа к Сервису.
                </li>
                <li>
                  <strong className="text-sx-cream">Акцепт</strong> — полное и безоговорочное принятие условий
                  настоящей оферты путём оплаты Подписки или начала использования Сервиса.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                2. Предмет оферты
              </h2>
              <p>
                Исполнитель обязуется предоставить Заказчику доступ к Сервису СЕРВЕКС в объёме
                выбранного тарифного плана, а Заказчик обязуется оплатить услуги в соответствии
                с действующими тарифами.
              </p>
              <p className="mt-3">
                Настоящая оферта является публичной офертой в соответствии со ст. 437 Гражданского
                кодекса Российской Федерации.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                3. Описание услуг
              </h2>
              <p>Сервис СЕРВЕКС предоставляет следующие услуги:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-sx-cream/80">
                <li>Автоматическая обработка клиентских обращений через мессенджеры</li>
                <li>Управление записями, переносами и отменами</li>
                <li>Аналитика и отчётность по клиентскому обслуживанию</li>
                <li>Интеграция с системами учёта и управления бизнесом</li>
                <li>Настраиваемые сценарии общения с клиентами</li>
              </ul>
              <p className="mt-3">
                Полный перечень функций зависит от выбранного тарифного плана и описан
                на странице servex.ru.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                4. Стоимость и порядок оплаты
              </h2>
              <p>
                Стоимость услуг определяется действующими тарифами, опубликованными на сайте
                servex.ru. Исполнитель вправе изменять тарифы, уведомив Заказчика не менее чем
                за 30 дней до вступления изменений в силу.
              </p>
              <p className="mt-3">
                Оплата производится в российских рублях на расчётный счёт Исполнителя или
                с использованием электронных платёжных систем. Подписка активируется после
                поступления оплаты.
              </p>
              <p className="mt-3">
                Возврат денежных средств производится в соответствии с законодательством
                Российской Федерации. Неиспользованный период подписки может быть возвращён
                по заявлению Заказчика.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                5. Права и обязанности сторон
              </h2>
              <h3 className="font-heading text-base font-medium text-sx-cream mt-4 mb-2">
                Исполнитель обязуется:
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-sx-cream/80">
                <li>Обеспечить доступ к Сервису в соответствии с выбранным тарифом</li>
                <li>Обеспечить сохранность и конфиденциальность данных Заказчика</li>
                <li>Оказывать техническую поддержку в рабочее время</li>
                <li>Информировать Заказчика об изменениях в работе Сервиса</li>
              </ul>

              <h3 className="font-heading text-base font-medium text-sx-cream mt-4 mb-2">
                Заказчик обязуется:
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-sx-cream/80">
                <li>Своевременно оплачивать услуги</li>
                <li>Использовать Сервис в соответствии с его назначением</li>
                <li>Не передавать данные для доступа третьим лицам</li>
                <li>Соблюдать законодательство Российской Федерации при использовании Сервиса</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                6. Ответственность
              </h2>
              <p>
                Исполнитель не несёт ответственности за убытки, возникшие вследствие
                ненадлежащего использования Сервиса Заказчиком, а также за перерывы в работе
                Сервиса, вызванные обстоятельствами непреодолимой силы или действиями третьих лиц.
              </p>
              <p className="mt-3">
                Совокупная ответственность Исполнителя по настоящей оферте ограничивается суммой,
                уплаченной Заказчиком за текущий оплаченный период подписки.
              </p>
              <p className="mt-3">
                Исполнитель предпринимает все разумные меры для обеспечения бесперебойной работы
                Сервиса, но не гарантирует его доступность 100% времени.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                7. Разрешение споров
              </h2>
              <p>
                Все споры и разногласия, возникающие из настоящей оферты, стороны будут стремиться
                разрешить путём переговоров. В случае невозможности достижения соглашения споры
                подлежат рассмотрению в суде по месту нахождения Исполнителя в соответствии
                с законодательством Российской Федерации.
              </p>
              <p className="mt-3">
                Досудебный порядок урегулирования споров является обязательным. Срок ответа
                на претензию составляет 30 (тридцать) рабочих дней с момента её получения.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-sx-cream mb-4">
                8. Контактные данные
              </h2>
              <p>ООО &laquo;СЕРВЕКС&raquo;</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 text-sx-cream/80">
                <li>Электронная почта: info@servex.ru</li>
                <li>Телеграм: @servex_bot</li>
                <li>Сайт: servex.ru</li>
              </ul>
            </section>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
