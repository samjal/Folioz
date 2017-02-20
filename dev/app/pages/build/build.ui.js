
// create page skeleton
export function buildSkeleton(data){
  return `
  <section>

  <header >
    <div class="row" >
      <div class="col s6">
        <span id="home" class=""><i class=" material-icons" style="font-size: 50px">home</i></span>
        <label for="home" style="font-size: 30px">Home</label>
      </div>
      <div class="col s6 right-align">
        <div class="input-field">
          <input id="search" type="search" required>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </div>
    </div>
  </header>

<div class="divider" style="height:60px"></div>


<div class="container" style="margin-top:50px">
      <div class="row" >
        <div class="col s6">
        <h4>${data.pageTitle}</h4>
      <ul class="collapsible" data-collapsible="accordion">
        <li>
          <div class="collapsible-header"><i class="material-icons">euro_symbol</i>Currencies</div>
          <div class="collapsible-body">
            <p>
              <input type="checkbox" name="product" class="filled-in" id="EC" />
              <label for="EC">Euro (EC)</label>
              <input type="hidden" name="dollar_value" value="1250">
            </p><div id="showId" style="display:none">
            <p id="ECPos" >
              <input class="with-gap" name="position" type="radio" id="long" />
              <label for="long">Long (Buy)</label>
              <input class="with-gap" name="position" type="radio" id="short" />
              <label for="short">Short (Sell)</label>
              <span class="range-field" id="ECQty" >

                <input type="range" name="quantity" id="qty" min="1" max="20" style= "width:70%"/>
                <label for="qty" style="font-size:1.1rem" >Quantity</label>
              </span>
            </p>
</div>

          </div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">gavel</i>Metals</div>
          <div class="collapsible-body">
            <p>
              <input type="checkbox" class="filled-in" id="gold" />
              <label for="gold">Gold (GC)</label>
            </p>
            <p>
              <input type="checkbox" class="filled-in" id="silver" />
              <label for="silver">Silver (SI)</label>
            </p>
          </div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">directions_car</i>Energy</div>
          <div class="collapsible-body">
            <p>
              <input type="checkbox" class="filled-in" id="crude" />
              <label for="crude">Crude Oil (CL)</label>
            </p>
          </div>
        </li>
      </ul>
    </div>






  <div class="col s6 right-align" style="border: solid 1px">
    <table    class="centered" class="highlight" class="responsive-table">
            <thead>
              <tr>
                  <th data-field="id">Product</th>
                  <th data-field="name">Position</th>
                  <th data-field="price">Quantity</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Gold</td>
                <td>+1</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Euro</td>
                <td>-1</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Crude Oil</td>
                <td>-1</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
</div>
</div>
</div>

  </section>
  `;
  }
