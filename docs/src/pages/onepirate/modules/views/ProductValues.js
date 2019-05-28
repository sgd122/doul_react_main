import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
                MyBuilder (마이빌더)
              </Typography>
              <Typography variant="h5">
                {'MyBuilder는 복잡하고 다양한 사용자 인터페이스를 손쉽게 개발할수 있도록 지원하는 개발도구로써 개발 생산성을 높일 수 있으며'}
                {', 강력한 데이터 및 UI 처리 엔진을 내장하여 빠른 속도로 업무를 처리하도록 지원합니다.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/static/themes/onepirate/productValues2.svg"
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                ECMS
              </Typography>
              <Typography variant="h5">
                {'ECMS (입학사정관 교육통합관리 시스템) : '}
                {'급변하는 교육환경과 대학 입학사정관의 다양하고 변화된 정보화 요구에 부응하고, 입학사정관을 위한 교육통합관리시스템 구축으로 대학의 경쟁력 확보. 언제 어디서나 접근할 수 있는 입학사정관 교육 통합관리 시스템 정보화 환경 구축을 위한 솔루션입니다.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/static/themes/onepirate/productValues3.svg"
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                현장실습 시스템
              </Typography>
              <Typography variant="h5">
                {'현장실습이란 학생의 공식적 교육의 일부로서, 관련 지역사회 사업기관에서 진행되는 업무로 구성. '}
                {'학생은 대학과 기관에서 받은 정해진 실습시간,기간을 이수해야하며 기관의 직원에게서 지도감독을 받고 대학에서 배운 것과 현장경험을 통합하고 활용하며 응용할 기회를 갖게 되는 것. 이를 체계적이고 효율적으로 관리할 수 있는 솔루션입니다.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
