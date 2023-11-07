

$(document).ready(function(){


    const moduleCreateFn = () => {
        let classLandStructureHtml = '';
        let classStringModuleHtml = '';
        let classPanelDivHtml = '';

        /* 회전 각도 , top위치, left위치 묶음번호 */
        let moduleDto = {
            landLength : 2,
            rotate : [20, -30],
            top : '',
            left : '',
            landNum : '',
            stringNum : 3,
            stringIndex : '',
            panelNum : 6,
            landNextTop : ''
        }
        
        for (let i = 0; i < moduleDto.landLength; i++) {
            let landNum = ("0"+i).slice(-2);
            classLandStructureHtml += `<div class="landStructure land${landNum}" style=" transform: rotate(${moduleDto.rotate[i]}deg); top: 1200px; left: 1400px;">`;
            for (let j = 0; j < moduleDto.stringNum; j++) {
                let stringNum = ("0"+j).slice(-2);
                classLandStructureHtml += `<div class="stringModule string${stringNum}" >`;
                for (let k = 0; k < moduleDto.panelNum; k++) {
                    let left = k * 84;
                    classLandStructureHtml += `
                        <div class="panelDiv"  string="${j}" modeuleNum="${k}" style ="left: ${left}px;">
                            <div>${j+1}-${k+1}</div>
                            <div></div>
                            <div>정상</div>
                        </div>
                    `; 
                }
                classLandStructureHtml += '</div>'
            }
            classLandStructureHtml += '</div>'
        }

        console.log(classLandStructureHtml);

    }

    moduleCreateFn();
});

`
<div class="landStructure land02" style=" transform: rotate(-20deg); top: 1200px; left: 1400px;">
    <div class="stringModule string17 " >
        <div class="panelDiv off"  string="17" modeuleNum="0" style ="left: 0px;">
            <div>18-1</div>
            <div></div>
            <div>정상</div>
        </div>
        <div class="panelDiv off"  string="17" modeuleNum="1" style="left: 86px;">
            <div>18-2</div>
            <div></div>
            <div>정상</div>
        </div>
        <div class="panelDiv"  string="17"  modeuleNum="2" style="left: 172px;">
            <div>18-3</div>
            <div></div>
            <div>정상</div>
        </div>
        <div class="panelDiv"  string="17" modeuleNum="3" style="left: 258px;">
            <div>18-4</div>
            <div></div>
            <div>정상</div>
        </div>
        <div class="panelDiv" string="17"  modeuleNum="4" style="left: 344px;">
            <div>18-5</div>
            <div></div>
            <div>정상</div>
        </div>
        <div class="panelDiv"  string="17" modeuleNum="5" style="left: 430px;">
            <div>18-6</div>
            <div></div>
            <div>정상</div>
        </div>
        <div class="panelDiv"  string="17" modeuleNum="6" style="left: 516px;">
            <div>18-7</div>
            <div></div>
            <div>정상</div>
        </div>
        <div class="panelDiv"  string="17" modeuleNum="7" style="left: 602px;">
            <div>18-8</div>
            <div></div>
            <div>정상</div>
        </div>
    </div>
</div>

`


`
<div class="landStructure land00" style=" transform: rotate(20deg); top: 1200px; left: 1400px;">
    <div class="stringModule string00" >
        <div class="panelDiv"  string="0" modeuleNum="0" style ="left: 0px;">
            <div>1-1</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="1" style ="left: 84px;">
            <div>1-2</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="2" style ="left: 168px;">
            <div>1-3</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="3" style ="left: 252px;">
            <div>1-4</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="4" style ="left: 336px;">
            <div>1-5</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="5" style ="left: 420px;">
            <div>1-6</div>
            <div></div>
            <div>정상</div>
        </div>
    </div>
    <div class="stringModule string01" >
        <div class="panelDiv"  string="1" modeuleNum="0" style ="left: 0px;">
            <div>2-1</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="1" style ="left: 84px;">
            <div>2-2</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="2" style ="left: 168px;">
            <div>2-3</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="3" style ="left: 252px;">
            <div>2-4</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="4" style ="left: 336px;">
            <div>2-5</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="5" style ="left: 420px;">
            <div>2-6</div>
            <div></div>
            <div>정상</div>
        </div>
    </div>
    <div class="stringModule string02" >
        <div class="panelDiv"  string="2" modeuleNum="0" style ="left: 0px;">
            <div>3-1</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="1" style ="left: 84px;">
            <div>3-2</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="2" style ="left: 168px;">
            <div>3-3</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="3" style ="left: 252px;">
            <div>3-4</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="4" style ="left: 336px;">
            <div>3-5</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="5" style ="left: 420px;">
            <div>3-6</div>
            <div></div>
            <div>정상</div>
        </div>
    </div>
</div>

<div class="landStructure land01" style=" transform: rotate(-30deg); top: 1200px; left: 1400px;">
    <div class="stringModule string00" >
        <div class="panelDiv"  string="0" modeuleNum="0" style ="left: 0px;">
            <div>1-1</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="1" style ="left: 84px;">
            <div>1-2</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="2" style ="left: 168px;">
            <div>1-3</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="3" style ="left: 252px;">
            <div>1-4</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="4" style ="left: 336px;">
            <div>1-5</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="0" modeuleNum="5" style ="left: 420px;">
            <div>1-6</div>
            <div></div>
            <div>정상</div>
        </div>
    </div>
    <div class="stringModule string01" >
        <div class="panelDiv"  string="1" modeuleNum="0" style ="left: 0px;">
            <div>2-1</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="1" style ="left: 84px;">
            <div>2-2</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="2" style ="left: 168px;">
            <div>2-3</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="3" style ="left: 252px;">
            <div>2-4</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="4" style ="left: 336px;">
            <div>2-5</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="1" modeuleNum="5" style ="left: 420px;">
            <div>2-6</div>
            <div></div>
            <div>정상</div>
        </div>
    </div>
    <div class="stringModule string02" >
        <div class="panelDiv"  string="2" modeuleNum="0" style ="left: 0px;">
            <div>3-1</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="1" style ="left: 84px;">
            <div>3-2</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="2" style ="left: 168px;">
            <div>3-3</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="3" style ="left: 252px;">
            <div>3-4</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="4" style ="left: 336px;">
            <div>3-5</div>
            <div></div>
            <div>정상</div>
        </div>
    
        <div class="panelDiv"  string="2" modeuleNum="5" style ="left: 420px;">
            <div>3-6</div>
            <div></div>
            <div>정상</div>
        </div>
    </div>
</div>

`