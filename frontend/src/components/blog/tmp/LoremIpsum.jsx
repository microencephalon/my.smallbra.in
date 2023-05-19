import React from 'react';
import CodeBlock from '../sub-components/CodeBlock';

const LoremIpsum = ({ n }) => {
  let loremContent;

  switch (n) {
    case 'title':
      loremContent = loremTitle();
      break;
    case 'code':
      loremContent = loremCode();
      break;
    case 3:
      loremContent = lorem3();
      break;
    case 5:
      loremContent = lorem5();
      break;
    case 10:
      loremContent = lorem10();
      break;
    case 20:
      loremContent = lorem20();
      break;

    case 30:
      loremContent = lorem30();
      break;
    default:
      return;
  }

  return <div>{loremContent}</div>;
};

function loremTitle() {
  return <>Lorem Ipsum Dolor</>;
}
function loremCode() {
  const code = `function lorem (x, y) {
  let ipsum = x;
  let dolor = y;
  return ipsum + dolor;
}`;
  return <CodeBlock language={'javascript'} code={code} />;
}

function lorem3() {
  return (
    <>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur modi
      commodi eum dolorem aspernatur nihil architecto amet expedita? Saepe et
      adipisci nostrum accusantium doloremque voluptas possimus hic commodi
      provident veniam. Reiciendis quos officiis aspernatur minus. Esse
      exercitationem ipsum sapiente numquam mollitia assumenda similique? Quae
      et, natus magni vitae temporibus sunt pariatur aliquam eius corrupti
      similique molestias doloribus quidem magnam obcaecati. Facilis aliquid
      asperiores, suscipit, reprehenderit natus atque quam expedita perspiciatis
      nisi sed mollitia! Hic necessitatibus unde illum explicabo. Voluptatum
      voluptatibus amet repellat maxime necessitatibus voluptates animi ab.
      Perferendis, rem facilis?
    </>
  );
}

function lorem5() {
  return (
    <>
      &#9; Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
      tenetur voluptate, ab itaque saepe exercitationem ad sequi aperiam nisi
      veritatis nesciunt qui! Reprehenderit suscipit ea iure explicabo aperiam
      deserunt aliquam? Nihil nesciunt excepturi autem culpa eligendi quod
      velit. Dicta necessitatibus cumque optio molestiae deserunt tempore velit
      odio repellendus atque inventore vero dolores, at facere quia iste
      aspernatur voluptas, repellat perspiciatis! Voluptate eos magnam iure quo
      reiciendis quis, laboriosam minima ab cumque eveniet tenetur voluptas
      numquam, perferendis similique beatae explicabo in molestiae doloribus!
      Enim, laborum. Totam, corrupti! Beatae odit optio numquam. Ullam quaerat
      consequuntur repellat excepturi aspernatur itaque, molestiae eos facilis
      adipisci? Omnis, aperiam. Ullam saepe ratione quo accusamus quia optio,
      quos modi corporis nulla sequi autem harum quae, laudantium corrupti!
      Quasi alias temporibus porro cumque? Dolores rem totam quis atque
      similique, eos laborum? Quisquam, eum. Dignissimos dolorum nobis et itaque
      nostrum? Veritatis, sit et. Esse dicta officia eligendi voluptas! Maiores.
    </>
  );
}

function lorem10() {
  return (
    <>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur est
      nulla nam, eum pariatur, esse itaque ipsum accusamus labore et ad.
      Voluptates aperiam, velit repellat reprehenderit delectus laborum expedita
      maxime. Atque a expedita nemo totam ullam dolor dignissimos quae
      distinctio sequi nam quas, officiis dolorem iste temporibus voluptas saepe
      enim labore modi, quisquam illum rem minus esse! Odio, delectus id.
      Quibusdam reiciendis maxime laboriosam dicta, nemo aliquam asperiores rem,
      quis quos, a adipisci quo laudantium impedit rerum sed architecto? Odio ea
      odit iusto consectetur itaque laboriosam ut sapiente suscipit expedita?
      Nam ipsam ea, quibusdam non doloribus, impedit sapiente illo pariatur,
      alias odit ipsum est! Doloribus ipsa repellat consequuntur quibusdam sequi
      modi fuga optio sit ipsam excepturi, est laudantium rerum tenetur. Atque
      deleniti doloremque libero corrupti ut nobis laboriosam accusantium,
      necessitatibus quam assumenda dolores asperiores omnis rem impedit ipsa
      sed amet quis facilis eos autem. Recusandae in a reprehenderit? Tempora,
      quod. Ullam quam nemo cum obcaecati a aperiam cupiditate debitis nisi,
      sunt architecto, dolores possimus impedit explicabo quos? Iure corporis
      distinctio quasi harum animi fugit iusto unde labore sed, illo accusamus.
      Facilis ea adipisci tenetur pariatur repellendus excepturi quisquam eius
      ab fuga provident? Quibusdam, nihil! Labore eveniet aperiam id voluptatum!
      Excepturi impedit eos, doloremque corrupti et vel repellendus dignissimos
      tenetur ducimus! Quibusdam debitis expedita, quasi beatae quo officiis
      reiciendis harum tempore odit dolorem rerum soluta doloremque, sit unde
      nostrum! Iste, harum ullam doloremque rem tempora sequi corrupti numquam
      error molestias sed? Architecto reiciendis sapiente quo dolorum rerum
      atque a at dolorem veritatis fugit. Aliquid, quidem alias amet excepturi
      nemo tenetur ipsum. Beatae dolores ad unde, vero ducimus aliquam officiis
      quibusdam id? Eaque possimus totam dignissimos nostrum. Voluptas quis
      dolorum quisquam maiores sapiente, debitis reprehenderit iusto cupiditate
      fugiat minima culpa, dolorem modi error voluptate amet ipsa, soluta quia
      nulla enim. Quisquam, accusantium!
    </>
  );
}

function lorem20() {
  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, provident
      dolorum quia explicabo eveniet nemo. Neque veritatis quaerat, sapiente
      ipsa ad voluptatum molestiae deleniti laboriosam iste laudantium? Quidem,
      ullam nesciunt? Ipsam autem, doloremque laborum, similique impedit, ullam
      nam illo atque assumenda ipsa quaerat corrupti iste quo? Exercitationem
      minima tenetur impedit, eaque aperiam deleniti blanditiis nostrum
      voluptatem ducimus, quod assumenda doloribus. Optio, quo qui? Excepturi
      fuga nostrum sed nulla temporibus, dignissimos ipsam delectus placeat
      beatae officiis corporis harum? Illo ut praesentium nisi asperiores
      molestias quibusdam. Sed ipsum id recusandae nostrum cupiditate. Neque
      consequatur ratione nulla inventore facilis ducimus placeat a enim commodi
      dolor et similique labore quidem excepturi, mollitia nobis modi odio iure.
      Aspernatur fugit quae, iste atque dignissimos laborum officia. Numquam
      dolorem perspiciatis animi explicabo ipsam deserunt repudiandae voluptate
      obcaecati at quidem nesciunt in, fugit harum quo sapiente ab veniam eum
      cum sint ratione a commodi? Magnam labore dolores veniam. Minima itaque
      veritatis excepturi repudiandae ad unde praesentium sunt quaerat
      molestiae, a accusantium dolorem, delectus laborum cupiditate perferendis
      laboriosam amet consequatur eaque possimus placeat quibusdam. Rerum
      molestiae saepe eligendi enim. Porro cum dolores totam quis deleniti nemo
      est esse. Facere iure dolorem non nam quam velit earum? Itaque explicabo
      dignissimos cumque similique ipsum rem impedit ab dicta, iusto quos natus!
      Illo fugiat aut explicabo ullam qui libero suscipit consequuntur illum
      deleniti tempore, nulla cum labore totam exercitationem autem, ipsam iure
      ratione ab molestias. Voluptates, dolorum earum expedita libero
      consectetur laudantium! Suscipit, architecto? Sed deserunt tenetur nobis
      voluptas, libero, quae numquam, totam nulla mollitia aliquid beatae!
      Deleniti ea odit quae animi eaque illum suscipit voluptas iste nulla,
      voluptatibus recusandae repellat adipisci. Aspernatur ex quod accusantium
      odio perferendis soluta ipsum fugiat totam. Necessitatibus ipsam in
      nesciunt omnis vel quaerat enim eius, iusto debitis esse quod voluptate!
      Illum laborum adipisci iure est nihil? Facere repellendus praesentium
      quisquam voluptate sequi a dicta deserunt alias animi exercitationem
      doloremque pariatur deleniti recusandae ad, placeat aliquid architecto
      eaque quo. Esse, asperiores sint. Neque possimus sit eum laboriosam!
      Pariatur inventore placeat culpa quia dolorum vitae quasi saepe non.
      Accusamus laboriosam distinctio odio, nulla repellendus architecto dolorum
      ducimus aliquid libero dolore. Quaerat minima nam voluptatem. Amet itaque
      doloribus qui! In aliquam sit officia! Porro est placeat enim accusantium,
      distinctio eaque repudiandae dolorem quidem debitis, accusamus
      consequuntur facere facilis tenetur et. Tenetur, est sequi quos nemo iste
      cupiditate nulla perferendis? Qui voluptate inventore tenetur repudiandae
      doloremque nesciunt autem quisquam ad ratione error eveniet non, culpa
      ipsum dolorum repellendus vero aspernatur soluta molestias amet quibusdam
      aliquid enim, ullam consequatur! Repellendus, animi! Vel laudantium
      perferendis velit optio dicta, assumenda nulla quis quae adipisci debitis
      nihil cum nam vitae aspernatur aliquid, officia consequuntur, placeat
      eaque nobis minima modi sapiente! Eius nobis atque ullam. Quas maxime
      dolores inventore in asperiores, pariatur non vitae error distinctio.
      Voluptate perferendis doloremque, possimus incidunt deleniti assumenda
      nobis unde maxime veritatis quod, ullam, commodi labore explicabo
      voluptatem beatae! Natus. Dolor, impedit. Exercitationem vero, dolorum
      nisi ipsum recusandae rem veniam officia. Rerum enim animi, saepe
      inventore totam voluptatibus accusantium facilis labore, temporibus nulla
      necessitatibus pariatur aut vel! Neque, necessitatibus officia. Quae,
      vitae maxime? Quae nesciunt, facilis quidem inventore minima expedita
      reiciendis debitis deserunt unde fugit aspernatur reprehenderit incidunt
      tenetur quaerat magnam repudiandae. Eum est unde voluptate rem maxime,
      deserunt explicabo! Impedit deserunt sapiente nam beatae adipisci. Tenetur
      deleniti iusto porro perferendis? Dicta odit, libero eaque in sed tenetur,
      vero velit est officiis, illo vel harum enim laboriosam cumque a
      distinctio? Impedit voluptas ipsam ad consequuntur delectus totam
      inventore sed amet, quas dolorem odit officiis aliquam minus non tempore
      dolorum? Praesentium aperiam eius quisquam magni consequuntur commodi,
      officiis voluptas beatae doloremque?
    </>
  );
}

function lorem30() {
  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nemo quasi,
      odio neque, eligendi porro quae itaque provident aut, cumque quibusdam
      tempora esse corporis ad! Quos beatae ipsum animi quisquam? Minima facilis
      maiores perspiciatis adipisci! Nemo, dolor ea repellat veritatis obcaecati
      ipsum quasi qui praesentium, minima mollitia exercitationem cumque amet
      suscipit totam illo explicabo aperiam quos temporibus laborum animi
      veniam. Consequatur quas accusamus alias vero excepturi voluptas ratione,
      voluptatem unde. Consectetur, tempore ducimus corporis modi natus debitis
      odit voluptatum nemo cupiditate, iure blanditiis voluptatibus voluptate
      quia doloremque similique est dignissimos. Reiciendis quod nisi
      distinctio. Eligendi esse itaque sequi cum, minus dicta culpa unde nisi
      quo neque ea modi ab sapiente facilis suscipit! Quas esse aspernatur
      temporibus corporis facere veniam quae! Quod reiciendis ducimus architecto
      explicabo praesentium corrupti. Sunt architecto explicabo atque numquam
      voluptas. Porro vitae deleniti et quo, assumenda accusantium expedita
      harum optio numquam ipsum voluptatibus eaque quisquam beatae. Soluta?
      Soluta error ullam veritatis beatae vitae hic officiis quod similique rem?
      Maiores deleniti quam commodi totam. Ab, fugiat dolorem quae, animi ipsum,
      quia illo dicta non aliquam quisquam eius? Quidem! Provident unde odio
      repellendus, id nisi quaerat harum maxime fugiat vero totam autem ipsum ut
      mollitia ipsa facere voluptas excepturi tenetur quis ab facilis reiciendis
      minima nobis fuga saepe. Laudantium! Beatae dolorum eius non voluptates
      cum dignissimos temporibus nesciunt architecto quasi minima a autem
      laborum reiciendis, vero odio consequuntur iusto soluta impedit voluptate
      illum. Sed ex commodi officia modi ab. Dolorum illo magnam, animi qui,
      similique ab accusantium laborum quibusdam, amet ut laboriosam quasi
      dolore nulla harum hic id molestiae porro? Temporibus ipsam numquam vero
      enim amet culpa illo nisi! Eum facilis voluptatem nam autem veritatis
      excepturi esse eius vero id? Provident, cum eveniet sapiente accusamus vel
      corrupti, ratione sunt temporibus nostrum consequatur eius sit? Facilis,
      corrupti. Quo, consequuntur exercitationem? Natus praesentium aut
      assumenda harum reprehenderit molestias veniam aliquam amet at non. Sint
      dicta quidem magnam architecto iusto quibusdam dolorum eaque itaque
      deserunt recusandae velit aperiam exercitationem voluptatem, corrupti
      voluptate! Quia amet mollitia, aspernatur iste quod similique! Repellat
      voluptates rerum cum natus animi itaque molestiae, sequi, saepe voluptatem
      totam quae? Esse necessitatibus eos qui aperiam doloremque illum alias
      adipisci veritatis! Consequuntur, possimus enim at earum dolores deserunt
      culpa eius quas similique laborum nihil doloribus veritatis, quia dolore,
      exercitationem cupiditate. Cum distinctio dolore hic at quam vero, quos
      explicabo porro nemo. Blanditiis sed autem aperiam asperiores excepturi
      molestiae ducimus necessitatibus, ipsa architecto esse hic possimus culpa
      similique? Quod, corporis. Rerum enim tempore architecto culpa vero
      adipisci natus itaque, nihil reiciendis cumque! Nihil, saepe culpa?
      Doloremque velit, molestiae in soluta sit, commodi laborum numquam esse
      ducimus nulla repellendus, unde minus earum consectetur adipisci hic omnis
      dignissimos et quibusdam natus odio voluptatem optio? Dolor vero nihil
      error at delectus ex officia doloribus autem inventore consequatur minima
      cupiditate repellat officiis, nulla possimus, ratione, iure corrupti
      veniam exercitationem sed consequuntur iusto? Laborum vero ea ipsum?
      Suscipit, expedita magni! Ducimus, accusamus! Sint adipisci aliquam sequi
      eos blanditiis explicabo vero exercitationem, libero voluptatem enim
      quaerat quos. Qui ab tempora delectus temporibus ea, sequi ad ratione ipsa
      ipsum! Illo provident fuga doloremque repudiandae voluptas laboriosam
      dignissimos maiores alias molestiae ipsa soluta sequi sit necessitatibus,
      sint fugiat nam eligendi blanditiis minus at veritatis eveniet.
      Exercitationem numquam similique maiores quam! Incidunt fuga natus iusto
      at quam unde nesciunt dicta molestias labore neque consectetur, voluptate
      laudantium voluptatibus id porro quidem, sint debitis omnis quae?
      Voluptatibus, officia! Maxime molestiae provident pariatur a! Nisi facilis
      earum nesciunt cupiditate labore tempora sunt dolor. Officiis aut
      architecto, cupiditate tempora nihil nobis! Sed nobis culpa fuga deserunt
      voluptatibus eveniet porro, ducimus laboriosam. Nisi laudantium placeat
      veritatis. Rerum sed, dolorum, fugit quidem, ex possimus harum nostrum aut
      tempora dolorem cupiditate inventore nemo excepturi explicabo omnis alias
      asperiores velit facilis unde eos commodi dolor animi. Ratione, animi ex!
      Inventore, rerum eos blanditiis deleniti, nemo dolore nobis iure dolor
      cupiditate ipsum sunt? Fugit quo possimus pariatur adipisci quod similique
      praesentium excepturi incidunt quasi cupiditate aperiam, minima debitis
      ratione repellendus? Hic facere unde accusantium modi praesentium.
      Consectetur autem asperiores cupiditate vel eos. Esse necessitatibus
      praesentium nobis ipsum et, numquam ea, libero consequuntur eum vero
      accusantium. Expedita iste ea nihil ut! Magnam totam assumenda, dicta
      fugit placeat dolorum iure nihil illo asperiores dolorem blanditiis
      quibusdam atque repudiandae doloremque officiis. Fugiat velit tempore est
      corrupti ullam repellendus, dolorem pariatur earum. Accusantium, nemo.
      Dignissimos animi quis rerum eligendi? Repellendus autem libero minus
      quasi quod! Doloribus amet modi laboriosam, voluptate qui optio dolores
      exercitationem dicta voluptas, sapiente, incidunt neque rerum blanditiis
      atque provident obcaecati! Sint voluptatum optio illo excepturi. Provident
      maxime eos animi, nobis magnam alias, quasi, in eius praesentium at
      doloremque sapiente repellat vel nulla? Vitae nisi assumenda amet neque
      modi perspiciatis ullam? Soluta, deleniti. Illum natus pariatur iure unde
      neque? Beatae itaque, ab amet numquam aperiam voluptatum perspiciatis
      ipsum vel id, iure alias facilis, recusandae quaerat culpa. Architecto
      similique quidem vel porro. Necessitatibus earum rem non laudantium minus,
      explicabo libero eaque asperiores, sint animi eos dolore sunt delectus eum
      optio fugit vel quo aspernatur quas, sit cumque. Sed, perferendis. Facere,
      rem optio? Veniam, iusto maiores officiis pariatur nulla architecto
      laboriosam obcaecati possimus quas odio itaque commodi a quos similique
      est repellendus, quisquam quo placeat et ipsam! Iure alias quos est illum.
      Necessitatibus? Quidem, tenetur natus vero cumque laudantium consequuntur,
      id, quibusdam ipsum totam modi iusto ex tempore voluptatum beatae?
      Praesentium expedita nihil nam sit, numquam, cupiditate ad consequuntur
      quod iste temporibus quo.
    </>
  );
}

export default LoremIpsum;
